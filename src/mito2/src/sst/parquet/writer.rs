// Copyright 2023 Greptime Team
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//! Parquet writer.

use common_telemetry::debug;
use common_time::Timestamp;
use object_store::ObjectStore;
use parquet::basic::{Compression, Encoding, ZstdLevel};
use parquet::file::metadata::KeyValue;
use parquet::file::properties::WriterProperties;
use parquet::schema::types::ColumnPath;
use snafu::ResultExt;
use store_api::metadata::RegionMetadataRef;
use store_api::storage::consts::SEQUENCE_COLUMN_NAME;

use crate::error::{InvalidMetadataSnafu, Result};
use crate::read::{Batch, Source};
use crate::sst::parquet::format::WriteFormat;
use crate::sst::parquet::{SstInfo, WriteOptions, PARQUET_METADATA_KEY};
use crate::sst::stream_writer::BufferedWriter;

/// Parquet SST writer.
pub struct ParquetWriter {
    /// SST output file path.
    file_path: String,
    /// Input data source.
    source: Source,
    /// Region metadata of the source and the target SST.
    metadata: RegionMetadataRef,
    object_store: ObjectStore,
}

impl ParquetWriter {
    /// Creates a new parquet SST writer.
    pub fn new(
        file_path: String,
        metadata: RegionMetadataRef,
        source: Source,
        object_store: ObjectStore,
    ) -> ParquetWriter {
        ParquetWriter {
            file_path,
            source,
            metadata,
            object_store,
        }
    }

    /// Iterates source and writes all rows to Parquet file.
    ///
    /// Returns the [SstInfo] if the SST is written.
    pub async fn write_all(&mut self, opts: &WriteOptions) -> Result<Option<SstInfo>> {
        let json = self.metadata.to_json().context(InvalidMetadataSnafu)?;
        let key_value_meta = KeyValue::new(PARQUET_METADATA_KEY.to_string(), json);
        let ts_column = self.metadata.time_index_column();

        // TODO(yingwen): Find and set proper column encoding for internal columns: op type and tsid.
        let props_builder = WriterProperties::builder()
            .set_key_value_metadata(Some(vec![key_value_meta]))
            .set_compression(Compression::ZSTD(ZstdLevel::default()))
            .set_encoding(Encoding::PLAIN)
            .set_max_row_group_size(opts.row_group_size)
            .set_column_encoding(
                ColumnPath::new(vec![SEQUENCE_COLUMN_NAME.to_string()]),
                Encoding::DELTA_BINARY_PACKED,
            )
            .set_column_dictionary_enabled(
                ColumnPath::new(vec![SEQUENCE_COLUMN_NAME.to_string()]),
                false,
            )
            .set_column_encoding(
                ColumnPath::new(vec![ts_column.column_schema.name.clone()]),
                Encoding::DELTA_BINARY_PACKED,
            );
        let writer_props = props_builder.build();

        let write_format = WriteFormat::new(self.metadata.clone());
        let mut buffered_writer = BufferedWriter::try_new(
            self.file_path.clone(),
            self.object_store.clone(),
            write_format.arrow_schema(),
            Some(writer_props),
            opts.write_buffer_size.as_bytes() as usize,
        )
        .await?;

        let mut stats = SourceStats::default();
        while let Some(batch) = self.source.next_batch().await? {
            stats.update(&batch);
            let arrow_batch = write_format.convert_batch(&batch)?;

            buffered_writer.write(&arrow_batch).await?;
        }

        if stats.num_rows == 0 {
            debug!(
                "No data written, try to stop the writer: {}",
                self.file_path
            );

            buffered_writer.close().await?;
            return Ok(None);
        }

        let (_file_meta, file_size) = buffered_writer.close().await?;
        // Safety: num rows > 0 so we must have min/max.
        let time_range = stats.time_range.unwrap();

        // object_store.write will make sure all bytes are written or an error is raised.
        Ok(Some(SstInfo {
            time_range,
            file_size,
            num_rows: stats.num_rows,
        }))
    }
}

#[derive(Default)]
struct SourceStats {
    /// Number of rows fetched.
    num_rows: usize,
    /// Time range of fetched batches.
    time_range: Option<(Timestamp, Timestamp)>,
}

impl SourceStats {
    fn update(&mut self, batch: &Batch) {
        if batch.is_empty() {
            return;
        }

        self.num_rows += batch.num_rows();
        // Safety: batch is not empty.
        let (min_in_batch, max_in_batch) = (
            batch.first_timestamp().unwrap(),
            batch.last_timestamp().unwrap(),
        );
        if let Some(time_range) = &mut self.time_range {
            time_range.0 = time_range.0.min(min_in_batch);
            time_range.1 = time_range.1.max(max_in_batch);
        } else {
            self.time_range = Some((min_in_batch, max_in_batch));
        }
    }
}

// TODO(yingwen): Port tests.
