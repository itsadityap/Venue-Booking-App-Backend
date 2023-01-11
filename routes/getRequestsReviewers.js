const express = require("express");
const router = express.Router();
const getAllRequestsController = require("../controllers/getAllRequestsReviewer");
const getPenRequestsController = require("../controllers/getPendingReqReviewer");
const getAppRequestsController = require("../controllers/getApprovedReqReviewer");
const checkAuthReviewer = require('../middlewares/check-auth-reviewer');

router.get("/getAllRequestsReviewers",
            checkAuthReviewer,
            getAllRequests);

router.get("/getPenRequestsReviewers",
            checkAuthReviewer,
            getPenRequests);

router.get("/getAppRequestsReviewers",
            checkAuthReviewer,
            getAppRequests);

async function getAllRequests(req, res) {
    getAllRequestsController
        .getAllRequestsReviewer(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

async function getPenRequests(req, res) {
    getPenRequestsController
        .getPenRequestsReviewer(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

async function getAppRequests(req, res) {
    getAppRequestsController
        .getAppRequestsReviewer(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;