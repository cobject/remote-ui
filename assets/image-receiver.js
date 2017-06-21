const dgram = require('dgram');
const fs = require('fs');
const REMOTE_PORT = 3001;
const LOCAL_PORT = 3100;

class ImageReceiver {
  constructor(host, window){
    this.host = host;
    this.port = REMOTE_PORT;
    this.window = window;
    this.client = dgram.createSocket('udp4');
    this.client.on('close', this.onClose.bind(this));
    this.client.on('error', this.onError.bind(this));
    this.client.on('message', this.onMessage.bind(this));
    this.client.on('listening', this.onListening.bind(this));
  }

  bind() {
    this.client.bind(LOCAL_PORT);
  }

  close() {
    this.client.close();
  }

  onClose(err) {
    console.log("onClose()");
  }

  onError(err) {

  }

  onMessage(msg, server) {
    this.window.webContents.send('image:receive', msg);
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
