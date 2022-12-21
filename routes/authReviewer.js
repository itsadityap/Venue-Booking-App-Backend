const express = require('express');
const router = express.Router();
const {signout, register, login} = require('../controllers/authReviewer');
const { check } = require('express-validator');

router.post('/signup', [
    check('email')
        .isEmail()
        .contains('@juitsolan.in')  
        .withMessage('A valid email is required with @juitsolan.in domain!'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password length must be at least 6')
], register);

router.post('/login', [
    check('password')
        .isLength({min: 6})
        .withMessage('Invalid Password Length!')
], login);


router.get('/signout', signout);

module.exports = router;