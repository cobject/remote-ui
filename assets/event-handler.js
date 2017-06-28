const electron = require('electron');
const { ipcRenderer } = electron;
const settings = require('electron-settings');
require('bootstrap-slider');

$('#host').val(settings.get('host'));

$('#localhost').click(() => {
  $('#host').val("localhost");
});

$('#robot-ip').click(() => {
  $('#host').val("172.20.10.14");
});

$('#connect-btn').click(() => {
  var host = $('#host').val();
  settings.set('host', host);
  ipcRenderer.send('network:connect', host);
});

$('#disconnect-btn').click(() => {
  ipcRenderer.send('network:disconnect');
});

$('#power-off').click(() => {
  ipcRenderer.send('power:off');
});

$('#record-start').click(() => {
  ipcRenderer.send('image:record', 'start');
});

$('#record-stop').click(() => {
  ipcRenderer.send('image:record', 'stop');
});

$('#record-delete-all').click(() => {
  ipcRenderer.send('image:record', 'delete-all');
});

ipcRenderer.on('image:camera:receive', (event, data) => {
  $('#camera-img').attr("src", 'data:image/jpeg;base64,' + data.toString('base64'));
});

ipcRenderer.on('image:debug:receive', (event, data) => {
  $('#debug-img').attr("src", 'data:image/jpeg;base64,' + data.toString('base64'));
});

ipcRenderer.on('host:change', () => {
  $('#host').html(settings.get('host'));
});

ipcRenderer.on('network:status', (event, data) => {
  if(data == "connected") {
    $('#ip').html(settings.get('host'));
    $('#port').html(settings.get('port.command'));
  }
  var cap = data[0].toUpperCase() + data.slice(1);
  $('#network-status').html(cap);
  $('#network-status').stop();
  $('#network-status').fadeOut();
  $('#network-status').fadeIn();
});

$('#camera-pan').slider({
  formatter: function(value) {
    return value;
  }
});

$('#camera-pan').slider().on('slideStop', (event) => {
  console.log("pan value: ", event.value);
  ipcRenderer.send('camera:control', {
    cmd: 1,
    value: event.value
  });
});

$("#camera-tilt").slider({
  reversed: true,
  formatter: function(value) {
    return value;
  }
});

$('#camera-tilt').slider().on('slideStop', (event) => {
  console.log("tilt value: ", event.value);
  ipcRenderer.send('camera:control', {
    cmd: 2,
    value: event.value
  });
});

$('#dump-slider').slider({
  formatter: function(value) {
    return value;
  }
});

$('#dump-slider').slider().on('slideStop', (event) => {
  // console.log("pan value: ", event.value);
});

$("#record-image").slider({
  formatter: function(value) {
    return value;
  }
});
