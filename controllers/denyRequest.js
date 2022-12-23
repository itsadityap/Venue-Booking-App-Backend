const Booking = require('../models/Booking');

async function denyRequest(req, res) 
{
    const { booking_id } = req.body;
    try
    {
        const booking = await Booking.findOne({booking_id:booking_id});
        if(booking.bookingStatus === "Approved")
        {
            res.status(409).json({message:"Request Already Approved, You Cannot Deny it now."});
            return;
        }
        if(booking.bookingStatus === "Denied")
        {
            res.status(409).json({message:"Request Already Denied"});
            return;
        }
        
        booking.bookingStatus = "Denied";
        await booking.save()
        console.log(booking);

        res.status(200).json({message:"Request Denied for Booking", bookingID:booking_id})
    }
    catch(err)
    {
        console.log(err);
        res.status(401).json({message:"Request Approval Failed"});
    }
}

module.exports = {
    denyRequest
};