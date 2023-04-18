const Booking = require('../models/Booking');
const Requester = require('../models/Request');
const nodemailer = require('nodemailer');
const DeviceMap = require('../models/Devices');
const notificationController = require('./notificationSender');


async function mail(requesterEmail, room, date, ID, eb) {
    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'itsadityap25@gmail.com',
            pass: process.env.MAIL_PASS
        }
    }
    )
    const options = {
        from: 'itsadityap25@gmail.com',
        to: requesterEmail,
        subject: `Request for Booking #${ID} has been Approved`,
        text: `Your Request for Booking-ID ${ID} Room ${room} on ${date} for ${eb} has been Approved by the Admin.`
    }

    mailTransporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    })
}

async function approveRequest(req, res) {
    const { booking_id } = req.body;
    try {
        const booking = await Booking.findOne({ booking_id: booking_id });
        const requesterID = booking.requestedBy;
        const room = booking.room;
        const date = booking.date;
        const ID = booking.booking_id;
        const eb = booking.eventBrief;

        const requester = await Requester.findOne({ _id: requesterID });
        const requesterEmail = requester.email;

        if (booking.bookingStatus === "Approved") {
            res.status(409).json({ message: "Request Already Approved" });
            return;
        }
        if (booking.bookingStatus === "Denied") {
            res.status(409).json({ message: "Request Already Denied, Ask to generate a new request" });
            return;
        }

        await mail(requesterEmail, room, date, ID, eb);

        booking.bookingStatus = "Approved";
        await booking.save()

        //notification
        const deviceID = await DeviceMap.findOne({ user_id: booking.requestedBy });
        if (deviceID.device_id) {
            await notificationController.notifSender(deviceID.device_id, "Request Approved", `Your request was approved for booking ${booking_id}`);
        }

        res.status(200).json({ message: "Request Approved Successfully", bookingID: booking_id })
    }
    catch (err) {
        res.status(500).json({ message: "Request Approval Failed" });
    }
}

module.exports = {
    approveRequest
};