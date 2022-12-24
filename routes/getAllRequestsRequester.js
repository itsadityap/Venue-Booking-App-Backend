const express = require("express");
const router = express.Router();
const getAllRequestsController = require("../controllers/getAllRequestsRequester");
const checkAuth = require('../middlewares/check-auth');

router.get("/getRequestsRequester",
            checkAuth,
            getAllRequests);

async function getAllRequests(req, res) {
    getAllRequestsController
        .getAllRequestsRequester(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;