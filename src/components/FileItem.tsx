import { FileItemData } from "../types";
import { format } from "date-fns";
import { openPath } from "@tauri-apps/plugin-opener";
import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";

export function FileItem({
  item,
  onNavigate,
}: {
  item: FileItemData;
  onNavigate: (path: string) => void;
}) {
  const handleClick = async () => {
    if (item.is_dir) {
      onNavigate(item.path);
    } else {
      try {
        await openPath(item.path);
      } catch (error) {
        console.error("Failed to open file:", item.path, error);
      }
    }
  };

  const handleContextMenu = async (e: React.MouseEvent) => {
    e.preventDefault();

    const { clientX: x, clientY: y } = e;
    const window = getCurrentWindow();

    try {
      await invoke("show_context_menu", {
        x: x * (await window.scaleFactor()),
        y: y * (await window.scaleFactor()),
      });
    } catch (error) {
      console.error("Failed to show context menu:", error);
    }
  };

  return (
    <div
      className={`file-item ${item.is_dir ? "directory" : "file"} ${
        item.is_hidden ? "hidden-item" : ""
      }`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      title={item.is_dir ? "Click to open folder" : "Click to open file"}
    >
      <div className="file-info">
        <span className="file-name">
          {item.is_dir ? "📁" : "📄"} {item.name}
        </span>
        <span className="file-time">{format(item.created, "yyyy-MM-dd HH:mm:ss")}</span>
      </div>
    </div>
  );
}
