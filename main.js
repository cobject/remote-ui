const electron = require('electron');
const ImageReceiver = require('./assets/image-receiver');
const CommandHandler = require('./assets/command-handler');
const settings = require('electron-settings');
const { app, BrowserWindow, ipcMain, Menu, dialog } = electron;

let template = [{
  label: 'Settings',
  submenu: [{
    label: 'localhost',
    click: () => {
      settings.set('host', "127.0.0.1");
      mainWindow.webContents.send('host:change');
    }
  }, {
    label: '172.20.10.14',
    click: () => {
      settings.set('host', "172.20.10.14");
      mainWindow.webContents.send('host:change');
    }
  }]
}];

const PREFERENCE = {
  enabled: true,
  // host: "127.0.0.1",
  host: "172.20.10.14",
  port: {
    command: 3000,
    data: {
      remote: {
        image: 3001,
        debug: 3002
      },
      local: {
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
  },
  persist: {
    mode: -1,
    action: -1,
    sign: -1,
    speed: 0,
    resolution: 0
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

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    resizable: true
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // mainWindow.webContents.openDevTools();

  imageReceiver = new ImageReceiver(settings.get('port.data.local.image'),
    'image:camera:receive',
    mainWindow);
  debugReceiver = new ImageReceiver(settings.get('port.data.local.debug'),
    'image:debug:receive',
    mainWindow);
  commandHandler = new CommandHandler(mainWindow);

  mainWindow.on('closed', function() {
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
  if (settings.has('enabled') === false) {
    settings.setAll(PREFERENCE);
  }
}

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  });
}
