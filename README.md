# File Explorer with Tauri + React + TypeScript

A modern cross-platform file explorer built with Tauri, React, and TypeScript. This application demonstrates the power of Rust's backend capabilities combined with React's frontend flexibility.

## Features

- 📁 Cross-platform file system navigation
- 🔍 Display files and directories
- 🕶 Hidden file detection and special styling
- ⏱ Sort files by creation time
- ↕️ Hierarchical navigation with "Go Up" functionality
- 🎨 Clean and responsive UI

## Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Rust (Tauri)
- **Styling**: CSS
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Rust](https://www.rust-lang.org/tools/install)
- [pnpm](https://pnpm.io/installation) (v8 or later)
- [VS Code](https://code.visualstudio.com/) (recommended)

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) with:
  - [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
  - [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
  - [TypeScript and JavaScript Language Features](https://marketplace.visualstudio.com/items?itemName=vscode.typescript-language-features)

### Installation

1. Clone the repository:

2. Run `pnpm install` to install the dependencies.

3. Run `pnpm tauri dev` to start the development server.

4. Run `pnpm tauri build` to build the application.

## Building

To create a production build:

```bash
pnpm tauri build
```

## Project Structure

```text
src/
  ├── App.tsx           # Main React component with file explorer UI
  ├── App.css           # Styles for file explorer
  └── assets/           # Static assets
src-tauri/
  ├── src/
  │   ├── lib.rs        # Core backend logic for file operations
  │   ├── main.rs       # Tauri application entry point
  │   └── types.rs      # FileItem type definitions
  └── Cargo.toml        # Rust dependencies
```

## Features in Detail

### File System Navigation

- Cross-platform support for Windows and Unix-like systems
- Automatic detection of system root directory
- Hierarchical directory navigation

### File Display

- Clear distinction between files and directories
- Special styling for hidden files (opacity: 0.6)
- File sorting:
  - Non-hidden files appear first
  - Items are sorted by creation time (newest first)
  - Hidden files are grouped at the end

### Error Handling

- Graceful error display for file system operations
- User-friendly error messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
