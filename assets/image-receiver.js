var PORT = 3000;  // server port
var HOST = $('#ip').val();
var dgram = require('dgram');
var message = new Buffer('start');

var client = dgram.createSocket('udp4');
client.bind(3001); // client port
client.on('message', function (msg, server) {
    console.log(server.address + ':' + server.port);
		var buffer = new Buffer(msg);
		$('#camera-img').attr("src", 'data:image/jpeg;base64,' + msg.toString('base64'));
});

client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
});
