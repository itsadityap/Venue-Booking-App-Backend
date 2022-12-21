const express = require("express");
const router = express.Router();
const approveRequestController = require("../controllers/approveRequest");
const checkAuth = require('../middlewares/check-auth');

router.post("/approve",
            checkAuth,
            approve);

async function approve(req, res) {
    approveRequestController
        .approveRequest(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;