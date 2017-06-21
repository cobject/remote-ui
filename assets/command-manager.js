const net = require('net');
const TCP_PORT = 3000;

// var HOST = '172.20.10.14'; // robot ip

class CommandManager {
	constructor(host) {
		this.host = host;
		this.client = new net.Socket();
		this.client.on('data', this.onData.bind(this));
	}

	connect() {
		this.client.connect(TCP_PORT, this.host, () => {
			console.log('Connected');
		});
	}

	close() {
		this.client.close();
	}

	registerCommandHandler(handler) {
		this.handler = handler;
	}

	onData(data){
	  console.log('Received: ', data);
		this.handler(data);
	}

	onClose() {
		console.log('Connection closed');
	  this.client.end();
	  this.client.destroy();
	}

  write(buf) {
		this.client.write(Buffer.from(buf));
	}
}

module.exports = CommandManager;
