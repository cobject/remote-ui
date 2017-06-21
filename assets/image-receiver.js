const dgram = require('dgram');
const REMOTE_PORT = 3001;
const LOCAL_PORT = 3101;

class ImageReceiver {
  constructor(host, window){
    this.host = host;
    this.port = REMOTE_PORT;
    this.window = window;
    this.client = dgram.createSocket('udp4');
    this.client.on('message', this.onMessage.bind(this));
    this.client.on('listening', this.onListening.bind(this));
  }

  bind() {
    this.client.bind(LOCAL_PORT);
  }

  close() {
    this.client.close();
  }

  onMessage(msg, server) {
    // console.log(server.address + ':' + server.port);
    this.window.webContents.send('image:receive', msg);
  }

  onListening(e) {
    console.log(e);
    this.sendStartMessage();
  }

  sendStartMessage() {
    var msg = new Buffer('start');
    console.log('host : ', this.host);
    this.client.send(msg, 0, msg.length, this.port, this.host, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to: ', this.port);
    });
  }
}

module.exports = ImageReceiver;
