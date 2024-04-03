mod loading_and_saving;

use tauri::{
    menu::{AboutMetadata, Menu, MenuBuilder, MenuItemBuilder, PredefinedMenuItem, SubmenuBuilder},
    App, Error, Wry,
};
use tauri_plugin_dialog::DialogExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let about_metadata: AboutMetadata = AboutMetadata::default();
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(target_os = "macos")]
            {
                let menu = setup_menubar(app, about_metadata)?;
                app.set_menu(menu)?;
                app.on_menu_event(move |app, event| {
                    if event.id() == "save_as" {
                        app.dialog().file().save_file(|file_path| {
                            if file_path.is_none() {
                                return;
                            }
                            let fp = file_path.unwrap();
                            println!("{:?}", fp);

                            // TODO: discover how to store file data before saving
                            // loading_and_saving::save_to_file();
                        })
                    }
                });
            }
            Ok(())
        })
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            loading_and_saving::open_language,
            loading_and_saving::save_to_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup_menubar(app: &mut App, about_metadata: AboutMetadata) -> Result<Menu<Wry>, Error> {
    let settings_menu_item = MenuItemBuilder::new("Settings").build(app)?;
    let creo_lingua_submenu = SubmenuBuilder::new(app, "CreoLingua")
        .item(&PredefinedMenuItem::about(
            app,
            Some("About"),
            Some(about_metadata),
        )?)
        .separator()
        .item(&settings_menu_item)
        .separator()
        .services()
        .separator()
        .hide()
        .hide_others()
        .quit()
        .build()?;
    let save_menu_item = MenuItemBuilder::new("Save")
        .accelerator("CmdOrControl+S")
        .id("save")
        .build(app)?;
    let save_as_menu_item = MenuItemBuilder::new("Save As")
        .accelerator("Shift+CmdOrControl+S")
        .id("save_as")
        .build(app)?;
    let file_submenu = SubmenuBuilder::new(app, "File")
        .item(&save_menu_item)
        .item(&save_as_menu_item)
        .separator()
        .close_window()
        .build()?;
    let menu = MenuBuilder::new(app)
        .item(&creo_lingua_submenu)
        .item(&file_submenu)
        .build();
    return menu;
}
