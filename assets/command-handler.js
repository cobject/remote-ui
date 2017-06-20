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
		this.registerCameraCommands();
		this.registerRobotCommands();
		this.registerModeCommands();
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

	registerCameraCommands() {
		ipcMain.on('cam:tilt', (angle) => {
			// console.log('cam:tilt', angle);
		});
		ipcMain.on('cam:pan', (angle) => {
			// console.log('cam:pan', angle);
		});
	}

	registerRobotCommands() {
		ipcMain.on('robot:fwd', (onOff) => {
			console.log('robot:fwd');
			this.commandManager.write(new Uint8Array([2, 4, 1]));
		});
		ipcMain.on('robot:back', (onOff) => {

		});
		ipcMain.on('robot:left', (onOff) => {

		});
		ipcMain.on('robot:right', (onOff) => {

		});
	}

	registerModeCommands() {
		ipcMain.on('mode:set', (mode) => {

		});
	}
}

module.exports = CommandHandler;
