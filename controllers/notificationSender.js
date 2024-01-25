// const messageController = require('../firebase');

// async function notifSender(deviceID, titleForReceiver, textForReceiver) {
//   const msg = {
//     notification: {
//       title: titleForReceiver,
//       body: textForReceiver,
//     },
//     token: deviceID,
//     android: {
//       priority: "high"
//     }
//   }

//   messageController.message.send(msg)
//     .then((res) => {
//       console.log('Notification sent successfully!');
//     })
//     .catch((err) => console.log(err));
// };

// module.exports = { notifSender };