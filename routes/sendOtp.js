const express = require('express');
const router = express.Router();

const User = require('../models/users');

router.post('/', async(req, res)=> {
    try {
        const {mobile} = req.body;

        const userExists = await User.findOne({mobile});
        if(!userExists){
            return res.status(400).json({message: "User not Found"})
        }

        const otp = Math.floor(100000 + Math.random()*900000).toString();
        
        userExists.otp = otp;
        userExists.otpExperies = Date.now() + 5*60*1000,
        await userExists.save();

        console.log("Fake OTP", otp)
        res.status(200).json({message: "OTP sent successfully"})

    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server error"})
    }
})

module.exports = router;