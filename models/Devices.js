const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  device_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Devices', DeviceSchema);