const express = require('express');
const router = express.Router();
const getDeviceGetterController = require('../controllers/getDevice');
const checkAuth = require('../middlewares/check-auth');

router.post('/getDevice', checkAuth, getDevice);

async function getDevice(req, res) {
  getDeviceGetterController.deviceGetter(req, res)
    .then((data) => { })
    .catch(err => console.log(err));
};

module.exports = router;