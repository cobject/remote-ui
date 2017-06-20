const electron = require('electron');
const { ipcRenderer } = electron;

$('#robot-fwd').mousedown(() => {
  ipcRenderer.send('robot:fwd', 1);
});

$('#robot-fwd').mouseup(() => {
  ipcRenderer.send('robot:fwd', 0);
});

$('#robot-back').mousedown(() => {
  ipcRenderer.send('robot:back', 1)
});

$('#robot-back').mouseup(() => {
  ipcRenderer.send('robot:back', 0);
});

$('#robot-left').mousedown(() => {
  ipcRenderer.send('robot:left', 1);
});

$('#robot-left').mouseup(() => {
  ipcRenderer.send('robot:left', 0);
});

$('#robot-right').mousedown(() => {
  ipcRenderer.send('robot:right', 1);
});

$('#robot-right').mouseup(() => {
  ipcRenderer.send('robot:right', 0);
});
