const Booking = require('../models/Booking');
const nodemailer = require('nodemailer')

function mail() 
{   
    const mailTransporter = nodemailer.createTransport( {
        service:'gmail',
        auth: {
            user:'itsadityap25@gmail.com',
            pass: process.env.MAIL_PASS
        }
      }
    )
    console.log(bodyDataEmail);
    const options = {
        from:'itsadityap25@gmail.com',
        to: bodyDataEmail,
        subject:'Test Mail - Zekademy',
        text:"Your Request for Booking has been Denied"
    }
    
    mailTransporter.sendMail(options, (err, info) => {
        if(err)
        {   
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    })
}

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