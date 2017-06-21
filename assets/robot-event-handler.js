const electron = require('electron');
const { ipcRenderer } = electron;

$('#robot-fwd').mousedown(() => {
  ipcRenderer.send('robot:control', {cmd: 1, onOff: true});
});

$('#robot-fwd').mouseup(() => {
  ipcRenderer.send('robot:control', {cmd: 1, onOff: false});
});

$('#robot-back').mousedown(() => {
  ipcRenderer.send('robot:control', {cmd: 2, onOff: true})
});

$('#robot-back').mouseup(() => {
  ipcRenderer.send('robot:control', {cmd: 2, onOff: false});
});

$('#robot-left').mousedown(() => {
  ipcRenderer.send('robot:control', {cmd: 3, onOff: true});
});

$('#robot-left').mouseup(() => {
  ipcRenderer.send('robot:control', {cmd: 3, onOff: false});
});

$('#robot-right').mousedown(() => {
  ipcRenderer.send('robot:control', {cmd: 4, onOff: true});
});

$('#robot-right').mouseup(() => {
  ipcRenderer.send('robot:control', {cmd: 4, onOff: false});
});
