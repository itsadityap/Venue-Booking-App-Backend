const DeviceMap = require('../models/Devices');

async function deviceRemover(req, res) {
  const { userID } = req.body;

  let user = DeviceMap.findOne({ user_id: userID });
  try {
    if (!user) {
      return res.status(404).json({ message: "Device not found!" });
    }
    else {
      await DeviceMap.deleteOne({ user_id: userID });
      res.status(200).json({ message: "Device removed successfully!" });
    }
  }
  catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { deviceRemover };