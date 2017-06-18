var net = require('net');
var client = new net.Socket();

client.connect(3002, '127.0.0.1', function() {
	console.log('Connected');
  $('#robot-control-left').click(function(){
    client.write("left");
  });
  $('#robot-control-go').click(function(){
    client.write("go");
  });
  $('#robot-control-back').click(function(){
    client.write("back");
  });
  $('#robot-control-right').click(function(){
    client.write("right");
  });
});

client.on('data', onData);

function onData(data){
  console.log('Received');
  if(data == "left ok") {
    console.log("left ok");
  } else if(data == "right ok") {
    console.log("right ok");
  } else if(data == "go ok") {
    console.log("go ok");
  } else if(data == "back ok") {
    console.log("back ok");
  }
}

client.on('close', function() {
	console.log('Connection closed');
  client.end();
  client.destroy();
});