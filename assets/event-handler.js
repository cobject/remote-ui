const electron = require('electron');
const { ipcRenderer } = electron;
const settings = require('electron-settings');

$('#host').val(settings.get('host'));

$('#connect-btn').click(() => {
  var host = $('#host').val();
  settings.set('host', host);
  ipcRenderer.send('network:connect', host);
});

$('#disconnect-btn').click(() => {
  ipcRenderer.send('network:disconnect');
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
  if(data == 1) {
    $('#ip').html(settings.get('host'));
    $('#port').html(settings.get('port.command'));
  }
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

$("#record-image").slider({
  formatter: function(value) {
    return value;
  }
});
