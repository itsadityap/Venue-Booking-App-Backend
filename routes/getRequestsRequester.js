const express = require("express");
const router = express.Router();
const getAllRequestsController = require("../controllers/getAllRequestsRequester");
const getAppRequestsController = require("../controllers/getApprovedReqRequester");
const getPenRequestsController = require("../controllers/getPendingReqRequester");
const checkAuth = require('../middlewares/check-auth');

router.get("/getAllRequestsRequester",
            checkAuth,
            getAllRequests);

router.get("/getPenRequestsRequester",
            checkAuth,
            getPenRequests);

router.get("/getAppRequestsRequester",
            checkAuth,
            getAppRequests);

async function getAllRequests(req, res) {
    getAllRequestsController
        .getAllRequestsRequester(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

async function getAppRequests(req, res) {
    getAppRequestsController
        .getAppRequestsRequester(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

async function getPenRequests(req, res) {
    getPenRequestsController
        .getPenRequestsRequester(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;