use tauri;

use crate::file_contents::FileContents;

#[tauri::command]
pub fn get_words(state: tauri::State<FileContents>) -> String {
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
                .lexicon
                .word
        )
        .unwrap()
    );
}

#[tauri::command]
pub fn add_word(state: tauri::State<FileContents>, word: String) {
    let words = &state
        .contents
        .lock()
        .unwrap()
        .dictionary
        .as_ref()
        .expect("Attempt to access uninitialised dictionary.")
        .lexicon
        .word;
    println!("Word: {}", word);
    // words.push(word);
}
