const express = require("express");
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const editRequestController = require('../controllers/editRequest');

router.put("/editRequest",
            checkAuth,
            editRequestRoute);

async function editRequestRoute(req, res) {
    editRequestController
        .editRequest(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;
