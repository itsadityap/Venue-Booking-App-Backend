const DeviceMap = require('../models/Devices');

async function deviceSetter(userID, deviceID) {
  let user = await DeviceMap.findOne({ user_id: userID });
  try {
    if (!user) {
      await DeviceMap.create
      ({
        user_id: userID,
        device_id: deviceID
      })
    }
    else {
      user.device_id = deviceID;
      await user.save();
    }
    console.log('Device set');
  }
  catch (err) {
    console.log('error in setting device\n', err);
  }
};

module.exports = { deviceSetter };