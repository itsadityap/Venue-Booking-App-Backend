const express = require("express");
const router = express.Router();
const createRequestController = require("../controllers/createRequest");
const checkAuth = require('../middlewares/check-auth');
//const checkAvailable = require('../middlewares/check-available');

router.post("/createRequest",
            checkAuth,
            createRequestRoute);

async function createRequestRoute(req, res) {
    createRequestController
        .createRequest(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;