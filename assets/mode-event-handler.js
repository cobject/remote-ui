const electron = require('electron');
const { ipcRenderer } = electron;

$('#mode-auto').click(() => {
  $('#mode').html("auto");
  ipcRenderer.send('mode:control', 1);
});

$('#mode-manual').click(() => {
  $('#mode').html("manual");
  ipcRenderer.send('mode:control', 2);
});

ipcRenderer.on('mode:notify', (event, data) => {
  console.log("mode:notify", data);
});
