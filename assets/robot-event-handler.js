const electron = require('electron');
const { ipcRenderer } = electron;

$(document).keydown(function(e) {
  if(handleKey(e.key, true) === true) {
    e.preventDefault();
  }
});

$(document).keyup(function(e) {
  if(handleKey(e.key, false) === true) {
    e.preventDefault();
  }
});

function handleKey(key, flag) {
  switch(key) {
    case "ArrowUp":     goForward(flag);    return true;
    case "ArrowDown":   goBackward(flag);   return true;
    case "ArrowLeft":   turnLeft(flag);     return true;
    case "ArrowRight":  turnRight(flag);    return true;
    default:
      return false;
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
