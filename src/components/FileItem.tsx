import { FileItemData } from "../types";
import { format } from "date-fns";

export function FileItem({
  item,
  onNavigate,
}: {
  item: FileItemData;
  onNavigate: (path: string) => void;
}) {
  return (
    <div
      className={`file-item ${item.is_dir ? "directory" : "file"} ${
        item.is_hidden ? "hidden-item" : ""
      }`}
      onClick={() => item.is_dir && onNavigate(item.path)}
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
