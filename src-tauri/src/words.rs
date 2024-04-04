
use tauri;

use crate::file_contents::FileContents;

#[tauri::command]
pub fn get_words(state: tauri::State<FileContents>) -> String {
    return format!("{}", state.contents.lock().unwrap()["dictionary"]["lexicon"]["word"].to_string());
}
