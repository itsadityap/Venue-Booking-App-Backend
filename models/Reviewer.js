const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const reviewerSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    full_name:{
        type: String,
        required: true
    },
    userType:{
        type: String,
        required: true,
        default: "Reviewer"
    },
    designation:{
        type: String
    },
    requests:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    }]
    ,
    encrypted_password: {
        type: String,
        required: true
    },
    salt: String
}, {
    timestamps: true
});


reviewerSchema.set("toJSON", {
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

// Virtual field for actual pasword.
reviewerSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.encrypted_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    })

// Custom methods for User Schema.
reviewerSchema.methods = {

    // Authenticate by verifying password.
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encrypted_password;
    },

    // Encrypt the plain password and store it in the
    // encrypted_password field.
    securePassword: function(plainpassword) {
        if(!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex')
        } catch(err) {
            return "";
        }
    }
}

module.exports = mongoose.model("Reviewer", reviewerSchema);