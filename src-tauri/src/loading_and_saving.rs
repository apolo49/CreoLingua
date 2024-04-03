use std::{
    fs,
    io::{Read, Write},
};

use tauri;
use zip::write::FileOptions;

static mut CURRENT_FILE: String = String::new();

#[tauri::command]
pub fn open_language(file_path: &str) -> String {
    let fname = std::path::Path::new(file_path);
    let zipfile = match fs::File::open(fname) {
        Ok(zipfile) => zipfile,
        Err(..) => {
            return format!("Unable to read {}.", file_path);
        }
    };
    let mut archive = match zip::ZipArchive::new(zipfile) {
        Ok(archive) => archive,
        Err(..) => {
            return format!("Unable to read {}.", file_path);
        }
    };
    let mut buf = String::new();
    let mut file = match archive.by_name("PGDictionary.xml") {
        Ok(file) => file,
        Err(..) => {
            return format!("Unable to read {}.", file_path);
        }
    };
    file.read_to_string(&mut buf).unwrap();

    unsafe {
        CURRENT_FILE = file_path.to_string();
    }

    return format!("{}", buf);
}

#[tauri::command]
pub fn save_to_file(file_contents: &[u8]) -> String {
    let file_path: String;
    unsafe {
        file_path = CURRENT_FILE.clone();
    }

    let fname = std::path::Path::new(&file_path);
    let zipfile = match fs::File::open(fname) {
        Ok(zipfile) => zipfile,
        Err(..) => {
            return format!("Unable to read {}.", file_path);
        }
    };
    let mut archive = zip::ZipWriter::new(zipfile);
    let options = FileOptions::default()
        .compression_method(zip::CompressionMethod::Stored)
        .unix_permissions(0o755);
    let _ = archive.start_file("PGDictionary.xml", options);
    let _ = archive.write_all(file_contents);
    let _ = archive.finish();
    return "Success!".to_string();
}
