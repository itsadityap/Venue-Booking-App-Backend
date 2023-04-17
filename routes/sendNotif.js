const express = require('express');
const router = express.Router();
const getNotifSenderController = require('../controllers/');
const checkAuth = require('../middlewares/check-auth');

router.post('/sendNotification', checkAuth, notifSender);

async function notifSender(req, res) {
  getNotifSenderController.sendNotif(req, res)
    .then((data) => {

    })
    .catch(err => console.log(err));
};

module.exports = router;