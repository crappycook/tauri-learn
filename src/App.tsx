import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { platform } from "@tauri-apps/plugin-os";
import "./App.css";

interface FileItem {
  name: string;
  path: string;
  is_dir: boolean;
}

function App() {
  // get current path from different os
  const platformName = platform();
  const [currentPath, setCurrentPath] = useState(platformName === "windows" ? "C:\\" : "/");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [error, setError] = useState<string>("");

  async function loadDirectory(path: string) {
    try {
      const items = await invoke<FileItem[]>("list_directory", { path });
      setFiles(items);
      setError("");
    } catch (err) {
      setError(String(err));
    }
  }

  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath]);

  const navigateToDirectory = (path: string) => {
    setCurrentPath(path);
  };

  return (
    <div className="container">
      <h1>File Explorer</h1>

      <div className="current-path">
        <p>Current Path: {currentPath}</p>
        <button
          onClick={() =>
            navigateToDirectory(currentPath.split(/[\\/]/).slice(0, -1).join("/") || "/")
          }
        >
          Go Up
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="file-list">
        {files.map((file) => (
          <div
            key={file.path}
            className={`file-item ${file.is_dir ? "directory" : "file"}`}
            onClick={() => file.is_dir && navigateToDirectory(file.path)}
          >
            {file.is_dir ? "📁" : "📄"} {file.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
