const electron = require('electron');
const { ipcRenderer } = electron;
const settings = require('electron-settings');

ipcRenderer.on('robot:status', onRobotCommand);

function onRobotCommand(event, data) {
  switch (data[0]) {
    case 0x01:
      handleRobotStatus(data[1], data[2]);
      break;

    case 0x02:
      handleSignInfo(data[1]);
      break;

    case 0x03:
      handleDebugInfo(data);
      break;

    default:
      console.log("onRobotCommand(), invalid id: ", data[0]);
      break;
  }
}

function handleRobotStatus(mode, action) {
  console.log("handleRobotStatus(), ", mode, action);
  $('#mode').html(settings.get("mode." + mode));
  $('#action').html(settings.get("action." + action));
}

function handleSignInfo(sign) {
  console.log("handleSignInfo(), sign = ", sign);
  $('#sign').html(settings.get("sign." + sign));
}

function handleDebugInfo(data) {
  console.log("handleDebugInfo(), data = ", data);
  switch(data[1]){
    case 0x01:  handleCameraServo(data);    break;
    case 0x02:  handleWheelServo(data);     break;
    case 0x03:  handleSonarRange(data);     break;
    default:
      console.log('handleDebugInfo(), invalid id: ', data[1]);
  }

  function handleCameraServo(data) {
    $(data[2] == 1 ?  '#camera-servo-pan' : '#camera-servo-tilt').html(data[3]);
  }

  function handleWheelServo(data) {
    $(data[2] == 1 ?  '#wheel-servo-left' : '#wheel-servo-right').html(data[3]);
  }

  function handleSonarRange(data) {
    $('#sonar-range').html(data[2]);
  }
}
