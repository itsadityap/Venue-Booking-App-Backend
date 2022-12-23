const express = require("express");
const router = express.Router();
const approveRequestController = require("../controllers/approveRequest");
const checkAuthReviewer = require("../middlewares/check-auth-reviewer");

router.post("/approve",
            checkAuthReviewer,
            approve);

async function approve(req, res) {
    approveRequestController
        .approveRequest(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;