const randomID = require('../controllers/requestIDGenerator')
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

async function createRequest(req, res) {

    const bookingId = randomID.generateRandomId();

    const { room,ApprovalAskedBy,eventBrief,date,time_start_hours,time_start_minutes,time_end_hours,time_end_minutes } = req.body;

    try
    {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userData = decoded;
        const allBookings = await Booking.find({requestedBy:req.userData._id});
        console.log(allBookings);
        for(let i=0;i<allBookings.length;i++)
        {
            if(allBookings[i].date === date)
            {
                if(allBookings[i].room === room)
                {
                    if(time_start_hours < allBookings[i].time_start_hours)
                    {
                        
                    }
                }
            }
        }
        // if(time_start_minutes < allBookings[i].time_start_minutes)
        //                 {
        //                     if(allBookings[i].time_end_hours <= time_start_hours)
        //                     {
        //                         if(allBookings[i].time_end_minutes < time_start_minutes)
        //                         {
        //                             return res.status(400).json({message:"The time slot you have selected is already booked for this room. Please select another time slot."});
        //                         }
        //                     }
        //                 }
        await Booking.create({room:room,
            eventBrief:eventBrief,
            booking_id:bookingId,
            date:date,
            ApprovalAskedBy:ApprovalAskedBy,
            time_start_hours:time_start_hours,
            time_start_minutes:time_start_minutes,
            time_end_hours:time_end_hours,
            time_end_minutes:time_end_minutes,
            requestedBy:req.userData._id
        });
        res.status(200).json({message:"Request Created Successfully", bookingID:bookingId});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }    
}

module.exports = {
    createRequest
};