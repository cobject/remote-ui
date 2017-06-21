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
  console.log('host:', host);
  imageReceiver = new ImageReceiver(host, mainWindow);
  imageReceiver.bind();

  commandHandler = new CommandHandler(host, mainWindow);
  commandHandler.start();
});
