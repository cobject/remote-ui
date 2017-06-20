const electron = require('electron');
const { ipcRenderer } = electron;

$('#cam-fwd').mousedown(() => {
  console.log('cam:pan', 0);
  ipcRenderer.send('cam:pan', 0);
});

$('#cam-back').mousedown(() => {
  console.log('cam:pan', 1);
  ipcRenderer.send('cam:pan', 1);
});

$('#cam-left').mousedown(() => {
  ipcRenderer.send('cam:tilt', 0);
});

$('#cam-right').mousedown(() => {
  ipcRenderer.send('cam:tilt', 1);
});
