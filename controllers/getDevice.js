const DeviceMap = require('../models/Devices');

async function deviceGetter(req, res) {
  const { userID } = req.body;

  let user = await DeviceMap.findOne({ user_id: userID });
  try {
    if (!user) {
      res.status(200).json({ found: 0 });
    }
    else {
      res.status(200).json({ found: 1, device_id: user.device_id })
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { deviceGetter };