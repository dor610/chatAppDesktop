const { BrowserWindow, ipcMain, dialog, app }= require('electron')
const path = require('path')
const fs = require('fs')

let mainWindow;


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    minWidth: 700,
    frame:false,
    transparent: true,
    webPreferences: {
            worldSafeExecuteJavaScript: true,
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'js/preload.js')
        }
  });

  mainWindow.loadURL(`file://${__dirname}/views/firstLoad.html`);

  mainWindow.on('closed', () => {
    mainWindow = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed',() => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});


ipcMain.on('windowControl', (event, arg) =>{
  switch (arg[0]) {
    case 'close':
      mainWindow.close();
      mainWindow.webContents.send('windowControlResposne', {strRes:'closed'});
      break;
    case 'minimize':
      mainWindow.minimize();
      mainWindow.webContents.send('windowControlResposne', {strRes:'minimized'});
      break;
    case 'maximize':
      mainWindow.maximize();
      mainWindow.webContents.send('windowControlResposne', {strRes:'maximized'});
      break;
    case 'unmaximize':
      mainWindow.unmaximize();
      mainWindow.webContents.send('windowControlResposne', {strRes:'unmaximized'});
      break;
    case 'remove-all-listeners':
      mainWindow.removeAllListeners();
      mainWindow.webContents.send('windowControlResposne', {strRes:'done'});
      break;
  }
});
