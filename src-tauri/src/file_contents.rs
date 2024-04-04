use std::sync::Mutex;

pub struct FileContents {
    pub contents: Mutex<serde_json::Value>
}
