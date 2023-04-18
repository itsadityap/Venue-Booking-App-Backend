const messageController = require('../firebase');

async function notifSender(deviceID, titleForReceiver, textForReceiver) {
  let payload = {
    notification: {
      title: titleForReceiver,
      body: textForReceiver,
    }
  };

  let options = {
    priority: "high"
  };

  messageController.message.sendToDevice(deviceID, payload, options)
    .then((res) => {
      console.log('Notification sent successfully!');
    })
    .catch((err) => console.log(err));
};

module.exports = { notifSender };