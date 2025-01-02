# Galar
~Golang App Laucnher for Arch Linux~

An app launcher with multiple features, built using Go, Wails (Go + ReactJS).
This application is designed to launch apps, perform mathematical calculations, and handle basic commands, all from a single interface.

## Features

- **App Launcher**: Browse and launch applications installed on the system.
- **Math Mode**: Perform quick calculations using `mathjs`.
- **Command Mode**: Listen all commands.
- **Responsive**: Designed to be fast and responsive without any reliance on authentication or external dependencies.

## Installation

### Prerequisites

- Go (version 1.18 or higher)
- Node.js (version 16 or higher)
- Wails CLI (for building and running the app)

### Steps

Clone the repository:

```bash
   git clone https://github.com/VinewZ/galar.git
   cd app-launcher
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
build/bin/galar
```
Start it with your system and it is gonna keep running in the background, whenever you want to launch it press the shortcut **SUPER + SPACE**.

## Usage

The app runs in the background and can be opened or closed using the shortcut **SUPER + SPACE**. Once opened, you can switch between modes using the **:** prefix.

Simply type to search for apps or input a command, and the app will respond accordingly. To close the app, just press **SUPER + SPACE** again.

## How It Works
Modes:

- App Launcher (:app_launcher / default): Displays a list of applications from the system and allows the user to launch them.
- Math Mode (:math): Allows the user to perform calculations using the mathjs library.
- Commands (:cmds): Displays the available commands (such as :app_launcher, :math, etc.), allowing the user to switch between modes.

## Folder Structure

/main.go                # The main entry point for the Go application
/frontend
  /src                     # ReactJS source code
  /public                  # Static assets like index.html, etc.
  /dist                    # Compiled frontend assets
/pkg
  /app                     # Go code for managing application logic (e.g., launching apps)
