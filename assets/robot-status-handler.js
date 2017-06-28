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

    case 0x03:
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
  var str = data.toString('utf8', 5, length + 5);
  var tokens = str.split(";");
  tokens.forEach( (token) => {
    console.log(token);
    var map = token.split("=");
    console.log("key=", map[0], " ,value=", map[1]);
    switch (map[0]) {
      case "action":
        if(map[1] == "Manual" || map[1] == "Suspend") {
          $("#mode").html(map[1]).fadeOut().fadeIn();
        } else {
          $("#mode").html("Auto").fadeOut().fadeIn();
        }
        $("#" + map[0]).html(map[1]).fadeOut().fadeIn();
        break;
      case "sign":
        // console.log(map[1]);];
        var filename = map[1].replace(" ", "-");
        console.log(filename);
        $("#" + map[0]).html(map[1]).fadeOut().fadeIn();
        $('#sign-image').attr("src", "./assets/sign/" + filename + ".jpg");
        $('#sign-image').fadeOut().fadeIn();
        break;
      case "pan":
      case "tilt":
      case "left":
      case "right":
      case "sonar":
        $("#" + map[0]).html(map[1]).fadeOut().fadeIn();
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
  var str = data.toString('utf8', 5, length + 5);
  $( "<tr><td>" + str + "</td></tr>").prependTo("tbody");
}

function handleHeartbeat() {
  $('#heartbeat').fadeOut().fadeIn();
}
