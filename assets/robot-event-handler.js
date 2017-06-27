const electron = require('electron');
const { ipcRenderer } = electron;

$(document).keydown(function(e) {
  e.preventDefault();
  handleKey(e.key, true);
});

$(document).keyup(function(e) {
  e.preventDefault();
  handleKey(e.key, false);
});

function handleKey(key, flag) {
  switch(key) {
    case "ArrowUp":     goForward(flag);    break;
    case "ArrowDown":   goBackward(flag);   break;
    case "ArrowLeft":   turnLeft(flag);     break;
    case "ArrowRight":  turnRight(flag);    break;
    default:
      break;
  }
}
$(document).keyup(function(e) {
  console.log("up", e.key);
});

function goForward(flag) {
  ipcRenderer.send('robot:control', {cmd: 1, onOff: flag});
}

function goBackward(flag) {
  ipcRenderer.send('robot:control', {cmd: 2, onOff: flag});
}

function turnLeft(flag) {
  ipcRenderer.send('robot:control', {cmd: 3, onOff: flag});
}

function turnRight(flag) {
  ipcRenderer.send('robot:control', {cmd: 4, onOff: flag});
}

$('#robot-fwd').mousedown(() => {
  goForward(true);
});

$('#robot-fwd').mouseup(() => {
  goForward(false);
});

$('#robot-back').mousedown(() => {
  goBackward(true);
});

$('#robot-back').mouseup(() => {
  goBackward(false);
});

$('#robot-left').mousedown(() => {
  turnLeft(true);
});

$('#robot-left').mouseup(() => {
  turnLeft(false);
});

$('#robot-right').mousedown(() => {
  turnRight(true);
});

$('#robot-right').mouseup(() => {
  turnRight(false);
});
