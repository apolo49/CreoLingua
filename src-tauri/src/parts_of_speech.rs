use tauri;

use crate::file_contents::FileContents;

#[tauri::command]
pub fn get_parts_of_speech(state: tauri::State<FileContents>) -> String {
    return format!(
        "{}",
        serde_json::to_string(
            &state
                .contents
                .lock()
                .unwrap()
                .dictionary
                .as_ref()
                .expect("Attempt to access uninitialised dictionary.")
                .parts_of_speech
                .class
        )
        .unwrap()
    );
}
