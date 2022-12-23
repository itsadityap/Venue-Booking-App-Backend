const express = require("express");
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const getReviewersController = require('../controllers/getReviewers');

router.get("/getReviewers",
            checkAuth,
            getRevirewersRoute);

async function getRevirewersRoute(req, res) {
    getReviewersController
        .getRevirewers(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;