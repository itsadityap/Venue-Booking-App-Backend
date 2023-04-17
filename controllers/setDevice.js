const DeviceMap = require('../models/Devices');

async function deviceSetter(req, res) {
  const { userID, deviceID } = req?.body;

  let user = await DeviceMap.findOne({ user_id: userID });
  try {
    if (!user) {
      await DeviceMap.create({
        user_id: userID,
        device_id: deviceID
      })
    }
    else {
      user.device_id = deviceID;
      await user.save();
    }
  }
  catch (err) {
    console.log('error in setting device\n', err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { deviceSetter };