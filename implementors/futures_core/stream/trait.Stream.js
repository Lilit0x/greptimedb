(function() {var implementors = {
"common_datasource":[["impl&lt;T: AsyncRead + AsyncSeek + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Unpin.html\" title=\"trait core::marker::Unpin\">Unpin</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static&gt; Stream for <a class=\"struct\" href=\"common_datasource/file_format/orc/struct.OrcArrowStreamReaderAdapter.html\" title=\"struct common_datasource::file_format::orc::OrcArrowStreamReaderAdapter\">OrcArrowStreamReaderAdapter</a>&lt;T&gt;"]],
"common_meta":[["impl&lt;K, V&gt; Stream for <a class=\"struct\" href=\"common_meta/range_stream/struct.PaginationStream.html\" title=\"struct common_meta::range_stream::PaginationStream\">PaginationStream</a>&lt;K, V&gt;"]],
"common_recordbatch":[["impl&lt;S: Stream&lt;Item = <a class=\"type\" href=\"common_recordbatch/error/type.Result.html\" title=\"type common_recordbatch::error::Result\">Result</a>&lt;<a class=\"struct\" href=\"common_recordbatch/recordbatch/struct.RecordBatch.html\" title=\"struct common_recordbatch::recordbatch::RecordBatch\">RecordBatch</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Unpin.html\" title=\"trait core::marker::Unpin\">Unpin</a>&gt; Stream for <a class=\"struct\" href=\"common_recordbatch/struct.RecordBatchStreamAdaptor.html\" title=\"struct common_recordbatch::RecordBatchStreamAdaptor\">RecordBatchStreamAdaptor</a>&lt;S&gt;"],["impl Stream for <a class=\"struct\" href=\"common_recordbatch/adapter/struct.DfRecordBatchStreamAdapter.html\" title=\"struct common_recordbatch::adapter::DfRecordBatchStreamAdapter\">DfRecordBatchStreamAdapter</a>"],["impl Stream for <a class=\"struct\" href=\"common_recordbatch/struct.SimpleRecordBatchStream.html\" title=\"struct common_recordbatch::SimpleRecordBatchStream\">SimpleRecordBatchStream</a>"],["impl&lt;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Unpin.html\" title=\"trait core::marker::Unpin\">Unpin</a> + AsyncFileReader + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static&gt; Stream for <a class=\"struct\" href=\"common_recordbatch/adapter/struct.ParquetRecordBatchStreamAdapter.html\" title=\"struct common_recordbatch::adapter::ParquetRecordBatchStreamAdapter\">ParquetRecordBatchStreamAdapter</a>&lt;T&gt;"],["impl Stream for <a class=\"struct\" href=\"common_recordbatch/adapter/struct.RecordBatchStreamAdapter.html\" title=\"struct common_recordbatch::adapter::RecordBatchStreamAdapter\">RecordBatchStreamAdapter</a>"],["impl Stream for <a class=\"struct\" href=\"common_recordbatch/struct.EmptyRecordBatchStream.html\" title=\"struct common_recordbatch::EmptyRecordBatchStream\">EmptyRecordBatchStream</a>"],["impl Stream for <a class=\"struct\" href=\"common_recordbatch/adapter/struct.AsyncRecordBatchStreamAdapter.html\" title=\"struct common_recordbatch::adapter::AsyncRecordBatchStreamAdapter\">AsyncRecordBatchStreamAdapter</a>"]],
"file_engine":[["impl Stream for <a class=\"struct\" href=\"file_engine/query/struct.FileToScanRegionStream.html\" title=\"struct file_engine::query::FileToScanRegionStream\">FileToScanRegionStream</a>"]],
"promql":[["impl Stream for <a class=\"struct\" href=\"promql/extension_plan/empty_metric/struct.EmptyMetricStream.html\" title=\"struct promql::extension_plan::empty_metric::EmptyMetricStream\">EmptyMetricStream</a>"],["impl Stream for <a class=\"struct\" href=\"promql/extension_plan/series_divide/struct.SeriesDivideStream.html\" title=\"struct promql::extension_plan::series_divide::SeriesDivideStream\">SeriesDivideStream</a>"],["impl Stream for <a class=\"struct\" href=\"promql/extension_plan/range_manipulate/struct.RangeManipulateStream.html\" title=\"struct promql::extension_plan::range_manipulate::RangeManipulateStream\">RangeManipulateStream</a>"],["impl Stream for <a class=\"struct\" href=\"promql/extension_plan/instant_manipulate/struct.InstantManipulateStream.html\" title=\"struct promql::extension_plan::instant_manipulate::InstantManipulateStream\">InstantManipulateStream</a>"],["impl Stream for <a class=\"struct\" href=\"promql/extension_plan/normalize/struct.SeriesNormalizeStream.html\" title=\"struct promql::extension_plan::normalize::SeriesNormalizeStream\">SeriesNormalizeStream</a>"]],
"query":[["impl Stream for <a class=\"struct\" href=\"query/range_select/plan/struct.RangeSelectStream.html\" title=\"struct query::range_select::plan::RangeSelectStream\">RangeSelectStream</a>"]],
"script":[["impl Stream for <a class=\"struct\" href=\"script/python/engine/struct.CoprStream.html\" title=\"struct script::python::engine::CoprStream\">CoprStream</a>"]],
"servers":[["impl Stream for <a class=\"struct\" href=\"servers/grpc/flight/stream/struct.FlightRecordBatchStream.html\" title=\"struct servers::grpc::flight::stream::FlightRecordBatchStream\">FlightRecordBatchStream</a>"]],
"table":[["impl Stream for <a class=\"struct\" href=\"table/table/numbers/struct.NumbersStream.html\" title=\"struct table::table::numbers::NumbersStream\">NumbersStream</a>"],["impl Stream for <a class=\"struct\" href=\"table/table/scan/struct.StreamWithMetricWrapper.html\" title=\"struct table::table::scan::StreamWithMetricWrapper\">StreamWithMetricWrapper</a>"],["impl Stream for <a class=\"struct\" href=\"table/test_util/memtable/struct.MemtableStream.html\" title=\"struct table::test_util::memtable::MemtableStream\">MemtableStream</a>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()