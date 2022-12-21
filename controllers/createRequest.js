const Requester = require('../models/requester');

async function createRequest(req, res) {
    const { email, full_name, batch } = req.body;
    
}

module.exports = {
    createRequest
};