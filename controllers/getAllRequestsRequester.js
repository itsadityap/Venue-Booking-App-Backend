const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

async function getAllRequestsRequester(req,res)
{
    try
    {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userData = decoded;

        const bookingList = await Booking.find({requestedBy:req.userData._id});
        res.status(200).json(bookingList);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports = {
    getAllRequestsRequester
};