const electron = require('electron');
const { ipcRenderer } = electron;

$('#connect-btn').click(() => {
  $('#ip').html('127.0.0.1');
  $('#port').html('3002');
  ipcRenderer.send('connect:request', '127.0.0.1');
});

ipcRenderer.on('image:receive', (event, data) => {
  $('#camera-img').attr("src", 'data:image/jpeg;base64,' + data.toString('base64'));
});

// With JQuery
$('#camera-pan').slider({
	formatter: function(value) {
		return value;
	}
});

$('#camera-pan').slider().on('slideStop', (event) => {
  console.log("pan value: ", event.value);
  ipcRenderer.send('camera:control', {cmd: 1, value: event.value});
});

// With JQuery
$("#camera-tilt").slider({
	reversed : true,
  formatter: function(value) {
		return value;
  }
});

$('#camera-tilt').slider().on('slideStop', (event) => {
  console.log("tilt value: ", event.value);
  ipcRenderer.send('camera:control', {cmd: 2, value: event.value});
});
