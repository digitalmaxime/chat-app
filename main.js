//This file is from the following source :
//https://stackoverflow.com/questions/38708419/how-to-port-an-existing-angular-app-to-electron

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600, icon: `src/assets/img/logo.png`})

  mainWindow.loadURL(`file://${__dirname}/dist/base-chat/index.html`)

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

