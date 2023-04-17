const express = require('express');
const router = express.Router();
const getDeviceRemoverController = require('../controllers/deleteDevice');
const checkAuth = require('../middlewares/check-auth');

router.post('/removeDevice', checkAuth, removeDevice);

async function removeDevice(req, res) {
  getDeviceRemoverController.deviceRemover(req, res)
    .then((data) => { })
    .catch(err => console.log(err));
};

module.exports = router;