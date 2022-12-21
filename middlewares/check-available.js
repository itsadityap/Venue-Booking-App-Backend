const Requester = require('../models/requester');
const Reviewer = require('../models/reviewer');

module.exports = (req, res, next) => {
    try{
        //if time is available
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Time is not available for this date for that particular class, Please select another date or another class!'
        });
    }
}