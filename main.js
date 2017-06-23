const electron = require('electron');
const ImageReceiver = require('./assets/image-receiver');
const CommandHandler = require('./assets/command-handler');
const settings = require('electron-settings');
const { app, BrowserWindow, ipcMain } = electron;

const PREFERENCE = {
  enabled: true,
  host: "127.0.0.1",
  port: {
    command: 3000,
    data: {
      remote : {
        image: 3001,
        debug: 3002
      },
      local : {
        image: 3101,
        debug: 3102
      }
    }
  },
  mode: {
    1: "Autonomous",
    2: "Manual",
    3: "Suspend"
  },
  action: {
    1: "Line Follow",
    2: "Sign Detect"
  },
  sign: {
    1: "Left Turn",
    2: "Right Turn"
  }
};

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

  imageReceiver = new ImageReceiver(settings.get('host'),
    settings.get('port.data.remote.image'),
    settings.get('port.data.local.image'),
    'image:camera:receive',
    mainWindow);
  debugReceiver = new ImageReceiver(settings.get('host'),
    settings.get('port.data.remote.debug'),
    settings.get('port.data.local.debug'),
    'image:debug:receive',
    mainWindow);
  commandHandler = new CommandHandler(settings.get('host'), mainWindow);

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
  console.log('host:', settings.get('host'));
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
  // settings.deleteAll();
  if(settings.has('enabled') === false) {
    settings.setAll(PREFERENCE);
  }
}
