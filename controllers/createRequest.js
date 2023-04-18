const randomID = require('../controllers/requestIDGenerator')
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const DeviceMap = require('../models/Devices');
const notificationController = require('./notificationSender');

async function createRequest(req, res) {

    const bookingId = randomID.generateRandomId();

    const { room,
        ApprovalAskedBy,
        clubAssociated,
        eventBrief,
        date,
        time_start_hours,
        time_start_minutes,
        time_end_hours,
        time_end_minutes,
        equipmentRequired
    } = req.body;

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userData = decoded;
        const allBookings = await Booking.find({ requestedBy: req.userData._id });

        for (let i = 0; i < allBookings.length; i++) {
            if (allBookings[i].date === date) {
                if (allBookings[i].room === room) {
                    if (time_end_hours < allBookings[i].time_start_hours) {
                        continue;
                    }
                    else if (time_end_hours === allBookings[i].time_start_hours) {
                        if (time_start_minutes > allBookings[i].time_end_minutes) {
                            continue;
                        }
                        if (time_end_minutes < allBookings[i].time_start_minutes) {
                            continue;
                        }
                        else {
                            return res.status(403).json({ message: "The time slot you have selected is already booked for this room. Please select another time slot or another room!" });
                        }
                    }
                    else if (time_start_hours > allBookings[i].time_end_hours) {
                        continue;
                    }
                    else if (time_start_hours === allBookings[i].time_end_hours) {
                        if (time_start_minutes > allBookings[i].time_end_minutes) {
                            continue;
                        }
                        else return res.status(403).json({ message: "The time slot you have selected is already booked for this room. Please select another time slot or another room!" });
                    }
                    else return res.status(403).json({ message: "The time slot you have selected is already booked for this room. Please select another time slot or another room!" });
                }
            }
        }

        await Booking.create({
            room: room,
            eventBrief: eventBrief,
            booking_id: bookingId,
            date: date,
            ApprovalAskedBy: ApprovalAskedBy,
            time_start_hours: time_start_hours,
            time_start_minutes: time_start_minutes,
            time_end_hours: time_end_hours,
            time_end_minutes: time_end_minutes,
            requestedBy: req.userData._id,
            clubAssociated: clubAssociated,
            equipmentRequired: equipmentRequired
        });

        //notification
        const deviceID = await DeviceMap.findOne({ user_id: ApprovalAskedBy });
        if (deviceID) {
            await notificationController.notifSender(deviceID.device_id, "New Request", `You have a new request!`);
        }

        res.status(200).json({ message: "Request Created Successfully", bookingID: bookingId });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    createRequest
};