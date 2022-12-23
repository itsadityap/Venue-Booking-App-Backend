const express = require("express");
const router = express.Router();
const denyRequestController = require("../controllers/denyRequest");
const checkAuthReviewer = require("../middlewares/check-auth-reviewer");

router.post("/deny",
            checkAuthReviewer,
            deny);

async function deny(req, res) {
    denyRequestController
        .denyRequest(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;