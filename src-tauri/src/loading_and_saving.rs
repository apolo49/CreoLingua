use std::{
    fs,
    io::{Read, Write},
};

use quickxml_to_serde::{xml_string_to_json, Config};
use tauri;
use zip::write::FileOptions;

use crate::file_contents::FileContents;

static mut CURRENT_FILE: String = String::new();

#[tauri::command]
pub fn open_language(state: tauri::State<FileContents>, file_path: &str) -> String {
    if file_path.ends_with(".pgd") {
        return open_legacy_file(state, file_path);
    } else if file_path.ends_with(".cld") {
        return open_file(state, file_path);
    }
    return format!("Unable to read {}.", file_path);
}

fn open_file(state: tauri::State<FileContents>, _file_path: &str) -> String {
    todo!()
}

fn open_legacy_file(state: tauri::State<FileContents>, file_path: &str) -> String {
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

    let conf = Config::new_with_defaults();
    let json = xml_string_to_json(buf.to_owned(), &conf).expect("Malformed PolyGlotDictionary");

    *state.contents.lock().unwrap() = serde_json::from_value(json.clone()).unwrap();

    return format!("{}", json.to_string());
}

#[tauri::command]
pub fn save_to_file(state: tauri::State<FileContents>, file_path: &str) -> String {
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
    let _ = archive.write_all(serde_json::to_string(&state.contents.lock().unwrap().dictionary.as_ref()).unwrap().as_bytes());
    let _ = archive.finish();
    return "Success!".to_string();
}

#[tauri::command]
pub fn save_to_file_legacy(file_contents: &[u8]) -> String {
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
