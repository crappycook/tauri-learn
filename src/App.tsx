import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { platform } from "@tauri-apps/plugin-os";
import { FileItem } from "./components/FileItem";
import { FileItemData } from "./types";
import "./App.css";

function App() {
  const platformName = platform();
  const [currentPath, setCurrentPath] = useState(platformName === "windows" ? "C:\\" : "/");
  const [files, setFiles] = useState<FileItemData[]>([]);
  const [error, setError] = useState<string>("");
  const [showHidden, setShowHidden] = useState(false);

  async function loadDirectory(path: string) {
    try {
      const items = await invoke<FileItemData[]>("list_directory", { path });
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

  const handleGoUp = () => {
    navigateToDirectory(currentPath.split(/[\\/]/).slice(0, -1).join("/") || "/");
  };

  const filteredFiles = showHidden ? files : files.filter((file) => !file.is_hidden);

  return (
    <div className="container">
      <h1>File Explorer</h1>

      <div className="current-path">
        <p>Current Path: {currentPath}</p>
        <div className="controls">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showHidden}
              onChange={(e) => setShowHidden(e.target.checked)}
              className="hidden-checkbox"
            />
            Show hidden files
          </label>
          <button onClick={handleGoUp}>Go Up</button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="file-list">
        {filteredFiles.map((file) => (
          <FileItem key={file.path} item={file} onNavigate={navigateToDirectory} />
        ))}
      </div>
    </div>
  );
}

export default App;
