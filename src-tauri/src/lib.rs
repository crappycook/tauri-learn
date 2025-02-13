mod types;
use std::fs;
use tauri::{menu::MenuBuilder, Manager, Runtime};
use types::FileItem;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn list_directory(path: &str) -> Result<Vec<FileItem>, String> {
    let entries = fs::read_dir(path).map_err(|e| e.to_string())?;

    let mut items = Vec::new();
    for entry in entries {
        if let Ok(entry) = entry {
            let path = entry.path();
            let metadata = entry.metadata().map_err(|e| e.to_string())?;
            let name = path
                .file_name()
                .and_then(|n| n.to_str())
                .unwrap_or("")
                .to_string();

            // 检查是否为隐藏文件/文件夹
            let is_hidden = name.starts_with(".");

            items.push(FileItem {
                name,
                path: path.to_string_lossy().to_string(),
                is_dir: path.is_dir(),
                is_hidden,
                created: metadata
                    .created()
                    .map(|time| {
                        time.duration_since(std::time::UNIX_EPOCH)
                            .unwrap_or_default()
                            .as_millis()
                    })
                    .unwrap_or_default(),
            });
        }
    }

    // 按创建时间倒序排序，隐藏文件排在后面
    items.sort_by(|a, b| {
        // 首先按照隐藏状态排序
        if a.is_hidden == b.is_hidden {
            // 如果隐藏状态相同，则按创建时间倒序
            b.created.cmp(&a.created)
        } else {
            // 隐藏文件排在后面
            a.is_hidden.cmp(&b.is_hidden)
        }
    });

    Ok(items)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![list_directory, show_context_menu])
        .setup(|app| {
            // 创建上下文菜单
            let context_menu = MenuBuilder::new(app)
                .text("open", "Open")
                .text("delete", "Delete")
                .build()?;

            // 先管理菜单状态
            app.manage(context_menu.clone());

            // 然后设置为窗口菜单
            app.set_menu(context_menu)?;

            app.on_menu_event(move |app, event| match event.id().0.as_str() {
                "open" => {
                    println!("Open clicked");
                }
                "delete" => {
                    println!("Delete clicked");
                }
                _ => {}
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn show_context_menu<R: Runtime>(
    window: tauri::Window<R>,
    app: tauri::AppHandle<R>,
    x: f64,
    y: f64,
) -> Result<(), String> {
    let context_menu = app.state::<tauri::menu::Menu<R>>();
    window
        .popup_menu(context_menu.inner())
        .map_err(|e| e.to_string())
}
