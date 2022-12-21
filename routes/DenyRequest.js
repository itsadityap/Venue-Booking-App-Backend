const express = require("express");
const router = express.Router();
const denyRequestController = require("../controllers/denyRequest");
const checkAuth = require('../middlewares/check-auth');

router.post("/deny",
            checkAuth,
            deny);

async function deny(req, res) {
    denyRequestController
        .denyRequest(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;