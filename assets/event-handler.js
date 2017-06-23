const electron = require('electron');
const { ipcRenderer } = electron;
const settings = require('electron-settings');

$('#connect-btn').click(() => {
  $('#ip').html(settings.get('host'));
  $('#port').html(settings.get('port.command'));
  ipcRenderer.send('network:connect', settings.get('host'));
});

$('#disconnect-btn').click(() => {
  ipcRenderer.send('network:disconnect');
});

ipcRenderer.on('image:camera:receive', (event, data) => {
  $('#camera-img').attr("src", 'data:image/jpeg;base64,' + data.toString('base64'));
});

ipcRenderer.on('image:debug:receive', (event, data) => {
  $('#debug-img').attr("src", 'data:image/jpeg;base64,' + data.toString('base64'));
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
