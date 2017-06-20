var net = require('net');
var client = new net.Socket();
var HOST = $('#ip').val();;

// var HOST = '172.20.10.14'; // robot ip
// var HOST = '127.0.0.1';
console.log("host = ", HOST);

client.connect(3002, HOST, function() {
	console.log('Connected');
	registerRobotControl();
	registerCameraControl();
	registerModeControl();
});

client.on('data', onData);

function registerCameraControl() {
	var buf = new Uint8Array([2, 0, 0]);

	$('#camera-control-forward').mousedown(function(){
    buf[1] = 1;
		buf[2] = 1;
    client.write(Buffer.from(buf));
  });
	$('#camera-control-forward').mouseup(function(){
    buf[1] = 1;
		buf[2] = 0;
    client.write(Buffer.from(buf));
  });
  $('#camera-control-backward').mousedown(function(){
    buf[1] = 2;
		buf[2] = 1;
    client.write(Buffer.from(buf));
  });
	$('#camera-control-backward').mouseup(function(){
    buf[1] = 2;
		buf[2] = 0;
    client.write(Buffer.from(buf));
  });
	$('#camera-control-left').mousedown(function(){
    buf[1] = 3;
		buf[2] = 1;
    client.write(Buffer.from(buf));
  });
	$('#camera-control-left').mouseup(function(){
    buf[1] = 3;
		buf[2] = 0;
    client.write(Buffer.from(buf));
  });
  $('#camera-control-right').click(function(){
    buf[1] = 4;
    client.write(Buffer.from(buf));
  });
	$('#camera-control-right').click(function(){
    buf[1] = 4;
    client.write(Buffer.from(buf));
  });	
}

function registerRobotControl() {
	var buf = new Uint8Array([1, 0]);
	$('#robot-control-forward').click(function(){
    buf[1] = 1;
    client.write(Buffer.from(buf));
  });
  $('#robot-control-backward').click(function(){
    buf[1] = 2;
    client.write(Buffer.from(buf));
  });
	$('#robot-control-left').click(function(){
    buf[1] = 3;
    client.write(Buffer.from(buf));
  });
  $('#robot-control-right').click(function(){
    buf[1] = 4;
    client.write(Buffer.from(buf));
  });
}

function registerModeControl() {
	var buf = new Uint8Array([3, 0]);
	$('#mode-control-auto').click(function(){
    buf[1] = 1;
    client.write(Buffer.from(buf));
  });
  $('#mode-control-manual').click(function(){
    buf[1] = 2;
    client.write(Buffer.from(buf));
  });
}

function onData(data){
  console.log('Received: ', data);
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
