const dgram = require('dgram');
const SERVER_PORT = 3001;

class ImageReceiver {
  constructor(host){
    this.host = host;
    this.port = 3000;
    this.client = dgram.createSocket('udp4');
    this.client.on('message', this.onMessage.bind(this));
  }

  bind() {
    this.client.bind(SERVER_PORT);
  }

  onMessage(msg, server) {
    console.log(server.address + ':' + server.port);
		$('#camera-img').attr("src", 'data:image/jpeg;base64,' + msg.toString('base64'));
  }

  sendStartMessage() {
    var msg = new Buffer('start');
    this.client.send(msg, 0, msg.length, this.port, this.host, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + this.host +':'+ this.port);
    });
  }
}

module.exports = ImageReceiver;
