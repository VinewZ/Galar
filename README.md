# Galar
~Golang App Laucnher for Arch Linux~

An app launcher with multiple features, built using Go, Wails (Go + ReactJS).
This application is designed to launch apps by default, but can be extended to include more features using [plugins](https://github.com/VinewZ/galar-plugin-calc).

[https://github.com/VinewZ/Galar/blob/main/.github/galar-showcasae.mp4](https://github.com/user-attachments/assets/71fd115c-3f6d-4bc2-973d-ce6928cb3844)

## Features
- **App Launcher**: Browse and launch applications installed on the system.
- **Plugins**: Easily add new features by creating new modes.

## Installation
- Download the latest version on [Releases](https://github.com/VinewZ/Galar/releases)

### Development - Prerequisites

- Go (version 1.18 or higher)
- Node.js (version 16 or higher)
- Wails CLI (for building and running the app)

### Steps

Clone the repository:

```bash
   git clone https://github.com/VinewZ/galar.git
   cd galar
```

Install Go dependencies:

```bash
go mod tidy
```

Install Node.js dependencies (inside the frontend folder):

```bash
cd frontend
pnpm install
```

Build and run the application:

In the root of the project:

```bash
wails dev
```
This will start the application in development mode with live reload.

## Build

Run the command in the root of the project:
```bash
wails build
```
And the binary is gonna be located at:
```bash
build/bin/galar-bin
```
Start it with your system and it is gonna keep running in the background, whenever you want to launch it press the shortcut **SUPER + SPACE**.

## Usage

The app runs in the background and can be opened or closed using the shortcut **SUPER + SPACE**. Once opened, you can switch between modes using the **:** prefix.

Simply type to search for apps or input a command, and the app will respond accordingly.
The only command available by default is the app launcher, which can be accessed just by typing the name of the app you want to launch.
More commands can be added by downloading [plugins](https://github.com/VinewZ/galar-plugin-calc).
To close the app, just press **SUPER + SPACE** again.

## How It Works
- An API runs in the background to read the user filesystem and return the list of installed applications.
- The frontend is built using ReactJS and communicates with the API to fetch the list of applications.
- The frontend also handles user input and uses go functions to launch the selected application.
- More commands can be added by downloading [plugins](https://github.com/VinewZ/galar-plugin-calc).

## Folder Structure
```
/main.go                   # The main entry point for the Go application
/frontend
  /src                     # ReactJS source code
  /public                  # Static assets like index.html, etc.
  /dist                    # Compiled frontend assets
/pkg
  /app                     # Go code for managing application logic (e.g., launching apps)
  /api                     # Go code for handling API requests
```
## TODO
- [ ]   Create a cmd to Kill the app (cmd :kill(?))
``` The Only Way to kill the app by now is killing the process in the terminal. ```
- [ ]   Settings page (cmd :settings (?))
    - [ ]   Theme manager
    - [ ]   Custom shortcuts
    - [ ]   Select port to run the API
- [ ]   CLI
    - [ ]   Install Plugins
    - [ ]   Uninstall Plugins
    - [ ]   Bootstrap New Plugin
