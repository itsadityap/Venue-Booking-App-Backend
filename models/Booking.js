const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    booking_id: {
        type: String,
        required: true,
    },
    bookingStatus:{
        type: String,
        default: "Pending",
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time_start_hours: {
        type: Number, 
        required: true, 
        min: 0, 
        max: 23
    },
    time_start_minutes: {
        type: Number, 
        required: true, 
        min: 0, 
        max: 59
    },
    time_end_hours: {
        type: Number, 
        required: true, 
        min: 0, 
        max: 23
    },
    time_end_minutes: {
        type: Number,
        min: 0, 
        max: 59,
        required: true
    },
    room:{
        type: String,
        required: true
    },
    eventBrief:{
        type: String
    },
    requestedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Requester"
    },
    ApprovalAskedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reviewer"
    }
})

module.exports = mongoose.model('Booking', BookingSchema);