const Booking = require('../models/Booking');

async function deleteRequest(req,res){
    const {booking_id} = req.body;
    try
    {
        const booking = await Booking.findOne({booking_id:booking_id});
        if(!booking)
        {
            return res.status(404).json({message:"Booking not found!"});
        }
        else if (booking.bookingStatus === "Approved" || booking.bookingStatus === "Denied")
        {
            return res.status(400).json({message:"Booking cannot be deleted as it has been approved!"});
        }
        else
        {
            await Booking.deleteOne({booking_id:booking_id})
            res.status(200).json({message:"Booking Deleted Successfully"});
        }
    }
    catch(err)
    {
        return res.status(500).json({message:"Something went wrong!, Internal Server Error"});
    }
}

module.exports = {
    deleteRequest
}