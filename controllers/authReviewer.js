const User = require('../models/Reviewer');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const deviceSetterController = require('./setDevice');


// Register User
exports.register = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'failed',
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                message: 'Failed',
                error: "Invalid Request! Email already exists!"
            })
        }

        // Create Token
        const token = jwt.sign({ _id: user._id, userType: "Reviewer" }, process.env.SECRET)

        // Put token in cookie
        res.cookie('token', token, { expire: new Date() + 9999 });

        //mail();

        res.json({
            message: 'Success',
            token,
            user:
            {
                email: user.email,
                id: user._id,
                name: user.full_name
            }
        });
    })
}


// Sign In User
exports.login = (req, res) => {
    const { password, email, deviceID } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'failed',
            error: errors.array()[0].msg
        })
    }

    User.findOne({ email }, async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'failed',
                error: "Email not found"
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                message: 'failed',
                error: "Invalid Credentials"
            })
        }

        // Create Token
        const token = jwt.sign({ _id: user._id, userType: "Reviewer" }, process.env.SECRET)

        // Put token in cookie
        res.cookie('token', token, { expire: new Date() + 9999 });

        // Send response to front end
        const { _id, email } = user;

        // Set android device ID for notifications
        await deviceSetterController.deviceSetter(_id, deviceID);

        return res.json({
            success: true,
            token,
            user: { id: _id, email, name: user.full_name }
        });
    })

}

// Signout
exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "User signed out"
    });
}