const electron = require('electron');
const { ipcRenderer } = electron;
const settings = require('electron-settings');

ipcRenderer.on('robot:status', onRobotCommand);

function onRobotCommand(event, data) {
  switch(data[0]) {
    case 0x01:
      handleRobotStatus(data[1], data[2]);
      break;

    case 0x02:
      handleSignInfo(data[1]);
      break;

    case 0x02:
      handleDebugInfo(data);
      break;

    default:
      console.log("onRobotCommand(), invalid id: ", data[0]);
      break;
  }
}

function handleRobotStatus(mode, action){
  console.log("handleRobotStatus(), ", mode, action);
  $('#mode').html(settings.get("mode." + mode));
  $('#action').html(settings.get("action." + action));
}

function handleSignInfo(sign) {
  console.log("handleDebugInfo(), sign = ", sign);
  $('#sign').html(settings.get("sign." + sign));
}

function handleDebugInfo(data) {
  console.log("handleDebugInfo(), data = ", data);
  // TODO
}
