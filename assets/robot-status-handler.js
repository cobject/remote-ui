const electron = require('electron');
const { ipcRenderer } = electron;
const settings = require('electron-settings');

ipcRenderer.on('robot:status', onRobotCommand);

function onRobotCommand(event, data) {
  switch (data[0]) {
    case 0x01:
      handleRobotStatus(data);
      break;

    case 0x02:
      handleDebugLog(data);
      break;

    case 0x06:
      handleHeartbeat();
      break;

    default:
      console.log("onRobotCommand(), invalid id: ", data[0]);
      break;
  }
}

function handleRobotStatus(data) {
  console.log("handleRobotStatus(), ", data);
  var length = data.readUInt32LE(1);
  // console.log("length====", length);
  var str = data.toString('utf8', 5);
  var tokens = str.split(";");
  tokens.forEach( (token) => {
    console.log(token);
    var map = token.split("=");
    console.log("key=", map[0], " ,value=", map[1]);
    switch (map[0]) {
      case "action":
        if(map[1] == 'Manual') {
          $("#mode").html('Manual');
        } else if(map[1] == 'Suspend') {
          $("#mode").html('Suspend');
        } else {
          $("#mode").html('Auto');
        }
        $("#" + map[0]).html(map[1]);
        break;
      case "sign":
        $("#" + map[0]).html(map[1]);
        $('#sign-image').src("./sign/" + map[1] + ".jpg");
        break;
      case "pan":
      case "tilt":
      case "left":
      case "right":
      case "sonar":
        $("#" + map[0]).html(map[1]);
        break;
      default:
        console.log("invalid status: ", map[0]);
        break;
    }
  });
}

function handleDebugLog(data) {
  console.log("handleDebugInfo(), data = ", data);
  var length = data.readUInt32LE(1);
  var str = data.toString('utf8', 5);
  $("tbody").add( "<tr><td>" + str + "</td></tr>");
}
