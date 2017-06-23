const net = require('net');
const settings = require('electron-settings');

class CommandManager {
  constructor(host) {
    this.host = host;
    this.port = settings.get('port.command');
    this.client = null;
  }

  connect() {
    if (this.client === null) {
      this.client = new net.Socket();
      this.client.on('close', this.onClose.bind(this));
      this.client.on('connect', this.onConnect.bind(this));
      this.client.on('data', this.onData.bind(this));
      this.client.on('drain', this.onDrain.bind(this));
      this.client.on('end', this.onEnd.bind(this));
      this.client.on('error', this.onError.bind(this));
      this.client.on('lookup', this.onLookup.bind(this));
      this.client.on('timeout', this.onTimeout.bind(this));
      this.client.connect(this.port, this.host);
    }
  }

  close() {
    if (this.client !== null) {
      this.client.end();
      this.client.destroy();
      this.client.unref();
      this.client = null;
    }
  }

  write(buf) {
    if (this.client !== null) {
      this.client.write(Buffer.from(buf));
    }
  }

  registerCommandHandler(handler) {
    this.handler = handler;
  }

  onClose() {
    console.log('cmd, onClose()');
    // TODO: popup
  }

  onConnect() {
    console.log("onConnect()");
  }

  onData(data) {
    console.log('onData(), data: ', data);
    this.handler(data);
  }

  onDrain() {
    console.log("onDrain()");
  }

  onEnd() {
    console.log("onEnd()");
  }

  onError(err) {
    console.log("onError()", err);
  }

  onLookup() {
    console.log("onLookup()");
  }

  onTimeout() {
    console.log("onTimeout");
  }
}

module.exports = CommandManager;
