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

//! Common types.

use api::v1::OpType;

/// Represents a sequence number of data in storage. The offset of logstore can be used
/// as a sequence number.
pub type SequenceNumber = u64;

// TODO(hl): We should implement a `min` method for OpType in greptime-proto crate.
pub const MIN_OP_TYPE: OpType = OpType::Delete;
