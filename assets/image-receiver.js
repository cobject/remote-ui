var PORT = 3333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var message = new Buffer('My KungFu is Good!');

var client = dgram.createSocket('udp4');
client.bind(3000);
client.on('message', function (msg, server) {
    console.log(server.address + ':' + server.port);
		// client.close();
		var buffer = new Buffer(msg);
		$('#camera-img').attr("src", 'data:image/jpeg;base64,' + msg.toString('base64'));
});

client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    // client.close();
});
