const Booking = require('../models/Booking');

async function editRequest(req,res) 
{
    const {booking_id, 
        room, 
        clubAssociated, 
        eventBrief, date, 
        time_start_hours, 
        time_start_minutes, 
        time_end_hours, 
        time_end_minutes} = req?.body;
    
    let book = await Booking.findOne({booking_id:booking_id})
    if(!book)
    {
        return res.status(404).json({message:"Booking not found!"});
    }
    else if(book.bookingStatus !== "Pending")
    {
        res.status(403).json({message:"You cannot edit this booking!"});
    }

    try
    {
        if(room != undefined)
        book.room = room;
        if(clubAssociated !== undefined)
        book.clubAssociated = clubAssociated;
        if(eventBrief !== undefined)
        book.eventBrief = eventBrief;
        if(date !== undefined)
        book.date = date;
        if(time_start_hours !== undefined)
        book.time_start_hours = time_start_hours;
        if(time_start_minutes !== undefined)
        book.time_start_minutes = time_start_minutes;
        if(time_end_hours !== undefined)
        book.time_end_hours = time_end_hours;
        if(time_end_minutes !== undefined)
        book.time_end_minutes = time_end_minutes;

        await book.save();

        res.status(200).json({message:"Booking updated successfully!", book});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Something went wrong!"});
    }
}

module.exports = {
    editRequest
}
