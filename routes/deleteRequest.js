const express = require("express");
const router = express.Router();
const deleteRequestController = require("../controllers/deleteRequest");
const checkAuth = require('../middlewares/check-auth');

router.delete("/deleteRequest",
            checkAuth,
            deleteRequestRoute);

async function deleteRequestRoute(req, res) {
    deleteRequestController
        .deleteRequest(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;