const electron = require('electron');
const { ipcRenderer } = electron;

// $('#mode-control-auto').click(function(){
//   buf[1] = 1;
//   client.write(Buffer.from(buf));
// });
// $('#mode-control-manual').click(function(){
//   buf[1] = 2;
//   client.write(Buffer.from(buf));
// });

$('#mode-control-auto').click(() => {
    ipcRenderer.send('mode:set', "auto");
});

$('#mode-control-manual').click( () => {
  ipcRenderer.send('mode:set', "manual");
});

ipcRenderer.on('mode:notify', (event, data) => {
  console.log("mode:notify", data);
});
