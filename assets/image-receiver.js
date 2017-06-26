const electron = require('electron');
const { ipcMain, app } = electron;
const dgram = require('dgram');
const fs = require('fs');
const settings = require('electron-settings');

class ImageReceiver {
  constructor(localPort, eventName, window) {
    this.localPort = localPort;
    this.window = window;
    this.client = null;
    this.eventName = eventName;
  }

  bind() {
    if (this.client === null) {
      this.client = dgram.createSocket('udp4');
      this.client.on('close', this.onClose.bind(this));
      this.client.on('error', this.onError.bind(this));
      this.client.on('message', this.onMessage.bind(this));
      this.client.on('listening', this.onListening.bind(this));
      this.client.bind(this.localPort);
      ipcMain.on('image:record', (event, flag) => {
        this.record = flag;
      });
    }
  }

  close() {
    if (this.client !== null) {
      this.client.close();
      this.client.unref();
      this.client = null;
    }
  }

  writeFile(dir, msg) {
    fs.writeFile(dir + new Date().getTime() + ".jpg", msg, (err) => {
      // fs.writeFile("./dump/" + new Date().getTime() + ".jpg", msg, {mode: 'w'}, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  onClose() {
    console.log("udp, onClose()");
  }

  onError(err) {
    console.log("onError()", err);
  }

  onMessage(msg, server) {
    this.window.webContents.send(this.eventName, msg);
    var dumpDir = app.getPath('userData') + "/dump/";

    if (this.record == 'start') {
      fs.stat(dumpDir, (err, stats) => {
        if(stats === undefined) {
          console.log("making dump dir");
          fs.mkdir(dumpDir, () => {
            this.writeFile(dumpDir, msg);
          });
        } else {
          this.writeFile(dumpDir, msg);
        }
      });
    } else if (this.record == 'delete-all') {
      fs.readdir(dumpDir, (err, files) => {
        if (err) console.log(err);
        files.forEach( (file) => {
          fs.unlinkSync(dumpDir + file);
        });
      });
    }
  }


  onListening(e) {
    console.log("listening...");
  }


}

module.exports = ImageReceiver;
