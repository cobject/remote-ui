var electron = require('electron');
const app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

app.on('ready', function(){
  mainWindow = new BrowserWindow({window: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();
});
