const electron = require('electron');
const CommandManager = require('./command-manager');
const { ipcMain } = electron;
const PORT = 3002;

// var HOST = '172.20.10.14'; // robot ip

class CommandHandler {
	constructor(host, window) {
		this.host = host;
		this.window = window;
		this.commandManager = new CommandManager(this.host);
		ipcMain.on('robot:control', this.onHandleRobotCommands.bind(this));
		ipcMain.on('camera:control', this.onHandleCameraCommands.bind(this));
		ipcMain.on('mode:control', this.onHandleModeCommands.bind(this));
	}

	start() {
		this.commandManager.registerCommandHandler(this.onData);
		this.commandManager.connect();
	}

	finish() {
		this.commandManager.close();
	}

	onData(data){
	  console.log('Received: ', data);
	}

	onHandleRobotCommands(event, data) {
		console.log('onHandleRobotCommands: ', data);
		this.commandManager.write(new Uint8Array([1, data.cmd, data.onOff == true ? 1 : 0]));
	}

	onHandleCameraCommands(event, data) {
		console.log('onHandleCameraCommands: ', data);
		this.commandManager.write(new Uint8Array([2, data.cmd, data.value]));
	}

	onHandleModeCommands(event, mode) {
		console.log('onHandleModeCommands: ', mode);
		this.commandManager.write(new Uint8Array([3, mode]));		
	}
}

module.exports = CommandHandler;
