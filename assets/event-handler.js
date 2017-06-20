const electron = require('electron');
const { ipcRenderer } = electron;

$('#connect-btn').click(() => {
  ipcRenderer.send('connect:request', $('#ip').val());
});

ipcRenderer.on('image:receive', (event, data) => {
  $('#camera-img').attr("src", 'data:image/jpeg;base64,' + data.toString('base64'));
});
