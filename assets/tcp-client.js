var net = require('net');
var fs = require('fs');
console.log('aaaa');
var client = new net.Socket();

client.connect(3000, '127.0.0.1', function() {
	console.log('Connected');
  writeData(client, 'ready');
});

client.on('data', function(data) {
	console.log('Received');
  if(data == 'end') {
    client.destroy();
  } else {
    $('#camera-img').attr("src", 'data:image/jpeg;base64,' + data);
    writeData(client, 'ok');
    // fs.writeFile('temp.jpg', data, function(err){
    //     console.log('It\'s saved!');
    //     $('#camera-img').attr("src", 'temp.jpg');
    //     writeData(client, 'ok');
    // });
  }
});

function writeData(socket, data) {
    var success = socket.write(data);
    if(!success) {
        (function(socket, data) {
            socket.once('drain', function(){
              writeData(socket, data);
            });
        }) (socket, data);
    }
}

client.on('close', function() {
	console.log('Connection closed');
  client.end();
  client.destroy();
});
