import { FileItemData } from "../types";
import { format } from "date-fns";
import { openPath } from "@tauri-apps/plugin-opener";

export function FileItem({
  item,
  onNavigate,
}: {
  item: FileItemData;
  onNavigate: (path: string) => void;
}) {
  const handleDoubleClick = async () => {
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

  return (
    <div
      className={`file-item ${item.is_dir ? "directory" : "file"} ${
        item.is_hidden ? "hidden-item" : ""
      }`}
      onDoubleClick={handleDoubleClick}
      title={item.is_dir ? "Double click to open folder" : "Double click to open file"}
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
