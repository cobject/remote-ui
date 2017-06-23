const dgram = require('dgram');
const fs = require('fs');

class ImageReceiver {
  constructor(host, remotePort, localPort, eventName, window) {
    this.host = host;
    this.remotePort = remotePort;
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
    }
  }

  close() {
    if (this.client !== null) {
      this.client.close();
      this.client.unref();
      this.client = null;
    }
  }

  onClose() {
    console.log("udp, onClose()");
  }

  onError(err) {
    console.log("onError()", err);
  }

  onMessage(msg, server) {
    this.window.webContents.send(this.eventName, msg);
    // console.log("file: ", "./dump/" + new Date().getTime());
    // fs.writeFile("./dump/" + new Date().getTime() + ".jpg", msg, function(err){
    // if(err) {
    // console.log(err);
    //   }
    // });
  }


  onListening(e) {
    console.log("listening...");
  }

}

module.exports = ImageReceiver;
