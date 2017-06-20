var electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow = null;

// require('electron-reload')(__dirname);

app.on('ready', createMainWindow);

function createMainWindow() {
  mainWindow = new BrowserWindow({ window: 1200, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
