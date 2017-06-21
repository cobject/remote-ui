const electron = require('electron');
const ImageReceiver = require('./assets/image-receiver');
const CommandHandler = require('./assets/command-handler');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow = null;
let imageReceiver = null;
let commandHandler = null;

// const HOST_IP = "127.0.0.1";
const HOST_IP = "172.20.10.14";
// require('electron-reload')(__dirname);

app.on('ready', createMainWindow);

function createMainWindow() {
  mainWindow = new BrowserWindow({ resizable: false});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // mainWindow.webContents.openDevTools();

  var screenElectron = electron.screen;
  var mainScreen = screenElectron.getPrimaryDisplay();
  var allScreens = screenElectron.getAllDisplays();

  console.log(mainScreen, allScreens);
  mainWindow.on('closed', function () {
    mainWindow = null;

    imageReceiver.close();
    imageReceiver = null;

    commandHandler.finish();
    commandHandler = null;
  });
}

ipcMain.on('connect:request', (event, host)=>{
  console.log('host:', HOST_IP);
  imageReceiver = new ImageReceiver(HOST_IP, mainWindow);
  imageReceiver.bind();

  commandHandler = new CommandHandler(HOST_IP, mainWindow);
  commandHandler.start();
});
