const electron = require('electron');
const ImageReceiver = require('./assets/image-receiver');
const CommandHandler = require('./assets/command-handler');
const settings = require('electron-settings');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow = null;
let imageReceiver = null;
let debugReceiver = null;
let commandHandler = null;

// require('electron-reload')(__dirname);

app.on('ready', createMainWindow);

function createMainWindow() {
  initSettings();

  mainWindow = new BrowserWindow({ width: 1280, height: 800, resizable: true});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // mainWindow.webContents.openDevTools();

  imageReceiver = new ImageReceiver(settings.get('host-ip'),
    settings.get('remote-image-port'),
    settings.get('local-image-port'),
    'image:camera:receive',
    mainWindow);
  debugReceiver = new ImageReceiver(settings.get('host-ip'),
    settings.get('remote-debug-port'),
    settings.get('local-debug-port'),
    'image:debug:receive',
    mainWindow);
  commandHandler = new CommandHandler(settings.get('host-ip'), mainWindow);

  mainWindow.on('closed', function () {
    mainWindow = null;

    imageReceiver.close();
    imageReceiver = null;

    debugReceiver.close();
    debugReceiver = null;

    commandHandler.finish();
    commandHandler = null;
  });
}

ipcMain.on('network:connect', (event, host) => {
  console.log('host:', settings.get('host-ip'));
  // console.log(Date.now().toTimeString());
  imageReceiver.bind();
  debugReceiver.bind();
  commandHandler.start();
});

ipcMain.on('network:disconnect', (event) => {
  imageReceiver.close();
  debugReceiver.close();
  commandHandler.finish();
});

function initSettings() {
  if(settings.has('init-settings') === false) {
    settings.set('command-port', 3000)
      .set('remote-image-port', 3001)
      .set('remote-debug-port', 3002)
      .set('local-image-port', 3101)
      .set('local-debug-port', 3102)
      .set('host-ip', "127.0.0.1"/*"172.20.10.14"*/);
    settings.set('init-settings', true);
  }
}
