const ImageReceiver = require('./image-receiver');
let imageReceiver;

$('#connect-btn').click(function(){
  console.log('connect click');
  // console.log(window);
  debugger
  imageReceiver = new ImageReceiver($('#ip').val());
  imageReceiver.bind();
  imageReceiver.sendStartMessage();
});
