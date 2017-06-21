const electron = require('electron');
const ImageReceiver = require('./assets/image-receiver');
const CommandHandler = require('./assets/command-handler');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow = null;
let imageReceiver = null;
let commandHandler = null;

// require('electron-reload')(__dirname);

app.on('ready', createMainWindow);

function createMainWindow() {
  mainWindow = new BrowserWindow({ window: 1200, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;

    imageReceiver.close();
    imageReceiver = null;

    commandHandler.finish();
    commandHandler = null;
  });
}

ipcMain.on('connect:request', (event, host)=>{
  console.log('host:', host);
  imageReceiver = new ImageReceiver(host, mainWindow);
  imageReceiver.bind();

  commandHandler = new CommandHandler(host, mainWindow);
  commandHandler.start();
});
