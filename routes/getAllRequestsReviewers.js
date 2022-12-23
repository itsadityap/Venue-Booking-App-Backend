const express = require("express");
const router = express.Router();
const getAllRequestsController = require("../controllers/getAllRequestsReviewer");
const checkAuthReviewer = require('../middlewares/check-auth-reviewer');

router.get("/getRequestsReviewers",
            checkAuthReviewer,
            getAllRequests);

async function getAllRequests(req, res) {
    getAllRequestsController
        .getAllRequestsReviewer(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;