# Bookle

Bookle is a A simple, friendly ebook manager

## Whats Included? Adam's stuff is what!

- [adm-zip](https://www.npmjs.com/package/adm-zip)
- [glob](https://www.npmjs.com/package/glob)
- [rimraf](https://www.npmjs.com/package/rimraf)
- [electron](https://www.npmjs.com/package/electron)
- [electron-reload](https://www.npmjs.com/package/electron-reload)

## Prerequisites
- node `^4.7.0`
- npm `^2.0.0`

## Installation

Enter the following commands in your shell / terminal.  If you're on Windows, you'll need to use [Git BASH](https://git-for-windows.github.io/) or similar.

```bash
# Clone this repository
git clone https://github.com/Adam-Collier/Bookle
# Go into the repository
cd Bookle
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you want the app to reload on changes you need to make sure `require('electron-reload')('**/*.{css,js,html}');
` isnt commented out in `main.js`

## Usage

Enter the following command to start the dev app:

```bash 
$ npm start
```

When this command executes your electron app should automatically open and you can start to contribute! Please note when changing anything in main.js you will need to manually restart the app for any changes to take effect.

## Project Structure

```
.
├── LICENSE.md
├── README.md
├── books
│   └── epub
├── fonts
│   ├── Lato-Bold.ttf
│   ├── Lato-Italic.ttf
│   ├── Lato-Light.ttf
│   ├── Lato-LightItalic.ttf
│   ├── Lato-Regular.ttf
│   ├── Lora-Bold.ttf
│   └── Lora-Regular.ttf
├── img
│   ├── add.svg
│   ├── close.svg
│   ├── list.svg
│   ├── read.svg
│   ├── read2.svg
│   └── upload.svg
├── index.html
├── js
│   ├── bookGenerate.js
│   ├── contextMenu.js
│   ├── index.js
│   ├── menu.js
│   ├── moveAndExtract.js
│   ├── openFile.js
│   └── saveEditedBook.js
├── main.css
├── main.js
├── node_modules
├── package.json
└── renderer.js
``` 

## Included Scripts
```
$ npm run start           # Starts the app
$ npm run build           # Builds the app
```

## Notes on electron

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Resources for Learning Electron

- [electron.atom.io/docs](http://electron.atom.io/docs) - all of Electron's documentation
- [electron.atom.io/community/#boilerplates](http://electron.atom.io/community/#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs
