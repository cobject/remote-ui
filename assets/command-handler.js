const electron = require('electron');
const CommandManager = require('./command-manager');
const { ipcMain, dialog } = electron;

const options = {
  type: 'info',
  title: 'Network Connection Fails',
  message: "Re-connect?",
  buttons: ['Yes', 'No']
};

class CommandHandler {
  constructor(window) {
    this.window = window;
    this.commandManager = new CommandManager();
    ipcMain.on('robot:control', this.onRobotCommands.bind(this));
    ipcMain.on('camera:control', this.onCameraCommands.bind(this));
    ipcMain.on('mode:control', this.onModeCommands.bind(this));
    ipcMain.on('power:off', this.onPowerOff.bind(this));
  }

  start() {
    this.commandManager.registerCommandHandler(this.onData.bind(this));
    this.commandManager.connect();
  }

  finish() {
    this.commandManager.close();
  }

  onDialogCallback(res) {
    console.log("onDialogCallback()", res);
    // No : 1, Yes: 0
    this.finish();
    if(0 == res) {
      this.start();
    }
  }

  onData(event, data) {
    console.log('onData: ', data);

    if(event == "robot:status") {
      if(data[0] == 0x01) {
        this.window.webContents.send("robot:status", data);
      } else if(data[0] == 0x02) {
        this.window.webContents.send("robot:log", data);
      } else if(data[0] == 0x06) {
        this.window.webContents.send("robot:heartbeat", data);
        this.handleHeartbeat();
      }
    } else {
      // to UI
      this.window.webContents.send(event, data);
    }
    // heartbeat
    if(data == "disconnected") {
      if(this.timerId !== undefined) {
        clearTimeout(this.timerId);
        this.timerId = undefined;
      }
    }
  }

  onRobotCommands(event, data) {
    console.log('onRobotCommands: ', data);
    this.commandManager.write(new Uint8Array([1, data.cmd, data.onOff === true ? 1 : 0]));
  }

  onCameraCommands(event, data) {
    console.log('onCameraCommands: ', data);
    this.commandManager.write(new Uint8Array([2, data.cmd, data.value]));
  }

  onModeCommands(event, mode) {
    console.log('onModeCommands: ', mode);
    this.commandManager.write(new Uint8Array([3, mode]));
  }

  onPowerOff(event, mode) {
    console.log("onPowerOff()");
    this.commandManager.write(new Uint8Array([5]));
  }

  handleHeartbeat() {
    if(this.timerId !== undefined) {
      clearTimeout(this.timerId);
      this.timerId = undefined;
      // callback heartbeat to Robot
      this.commandManager.write(new Uint8Array([6]));
    }
    this.timerId = setTimeout(this.onTimeout.bind(this), 5000);
  }

  onTimeout() {
    this.timerId = undefined;
    console.log("heartbeat error!!");
    dialog.showMessageBox(options, this.onDialogCallback.bind(this));
  }

}

module.exports = CommandHandler;
