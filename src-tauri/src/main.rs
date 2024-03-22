// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod loading_and_saving;

use tauri::{AboutMetadata, CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
    let about_metadata: AboutMetadata = AboutMetadata::default();
    tauri::Builder::default()
        .menu(setup_menubar(about_metadata.clone()))
        .invoke_handler(tauri::generate_handler![loading_and_saving::open_language, loading_and_saving::save_to_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup_menubar(about_metadata: AboutMetadata) -> Menu {
    let creo_lingua_submenu = Submenu::new(
        "CreoLingua",
        Menu::new()
            .add_native_item(MenuItem::About("".to_string(), about_metadata))
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new("settings", "Settings"))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Services)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Hide)
            .add_native_item(MenuItem::HideOthers)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit),
    );
    let file_submenu = Submenu::new(
        "File",
        Menu::new()
            .add_item(CustomMenuItem::new("save", "Save").accelerator("CmdOrControl+S"))
            .add_item(CustomMenuItem::new("save_as", "Save As").accelerator("Shift+CmdOrControl+S"))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::CloseWindow),
    );
    let menu = Menu::new()
        .add_submenu(creo_lingua_submenu)
        .add_submenu(file_submenu);
    return menu;
}
