const express = require("express");
const router = express.Router();
const createRequestController = require("../controllers/createRequest");
const checkAuth = require('../middlewares/check-auth');

router.post("/create",
            checkAuth,
            createRequest);

async function createRequest(req, res) {
    createRequestController
        .approveRequest(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;