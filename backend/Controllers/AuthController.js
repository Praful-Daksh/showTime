const User = require('../models/Users.js')
const OTP = require('../models/otp.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { transporter, generateOTP, sendOTPEmail } = require('./Mailer.js')

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(409)
                .json({ message: 'User is already registered', success: false })
        }
        const existingOtp = await OTP.findOne({ email: email });
        if (existingOtp) {
            existingOtp.createdAt = new Date();
            await existingOtp.save();
            return res.status(409).json({
                message: 'OTP Already set to your email. Please verify to complete registration.',
                success: true,
            });
        }

        const otp = generateOTP();

        const hashedPass = await bcrypt.hash(password, 10);

        await OTP.deleteOne({ email: email });

        const otpData = new OTP({
            email: email,
            otp: otp,
            userData: {
                name: name,
                email: email,
                password: hashedPass
            }
        });

        await otpData.save();

        await sendOTPEmail(email, otp);

        return res.status(200).json({
            message: 'OTP sent to your email. Please verify to complete registration.',
            success: true,
        });

    } catch (err) {
        return res.status(500)
            .json({ message: "Internal Server Error", success: false })
        console.error(err);
    }
}


// Login function

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(403)
                .json({ message: 'Email is not Registered', success: false })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(403)
                .json({ message: 'Invalid Password', success: false })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '12h'
        })
        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                token,
                email,
                name: user.name,
                ticketSold: user.ticketSold,
                revenueVip: user.revenueVip,
                revenueClassic: user.revenueClassic
            })
    } catch (err) {
        res.status(500)
            .json({ message: "Internal Server Error", success: false })
    }
}


// Get user data
const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404)
                .json({ message: 'User not found', success: false })
        }
        res.status(200)
            .json({
                message: "User Data", success: true, "user": {
                    "name": user.name,
                    "email": user.email,
                    "ticketSold": user.ticketSold,
                    "revenueVip": user.revenueVip,
                    "revenueClassic": user.revenueClassic
                }
            })
    } catch (err) {
        res.status(500)
            .json({ message: "Internal Server Error", success: false })
    }
}

// Update user data

const updateUser = async (req, res) => {
    try {
        const id = req.user.id;
        const { name, password } = req.body;


        let updateData = { name };

        if (password !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({ message: "User updated successfully", success: true, user: { name: updatedUser.name, email: updatedUser.email } });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}


// verify OTP and complete registration

const verifyOtpAndCompleteRegistration = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await OTP.findOne({ email: email })
        if (!otpRecord) {
            return res.status(400).json({
                message: 'OTP expired or invalid email',
                success: false
            });
        }

        if (otpRecord.otp !== otp) {
            return res.status(400).json({
                message: 'Invalid OTP',
                success: false
            });
        }

        const { name, email: userEmail, password } = otpRecord.userData;

        const newUser = new User({
            name,
            email: userEmail,
            password
        });

        await newUser.save();

        await OTP.deleteOne({ email });

        res.status(201).json({
            message: 'Account created successfully',
            success: true
        });

    } catch (err) {
        console.error('OTP verification error:', err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


//resend otp 

const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const otpRecord = await OTP.findOne({ email });

        if (!otpRecord) {
            return res.status(400).json({
                message: 'Request Timeout, try after some time',
                success: false
            });
        }

        const newOTP = generateOTP();

        otpRecord.otp = newOTP;
        otpRecord.createdAt = new Date();
        await otpRecord.save();

        await sendOTPEmail(email, newOTP);

        res.status(200).json({
            message: 'New OTP sent to your email',
            success: true
        });

    } catch (err) {
        console.error('Resend OTP error:', err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};



module.exports = {
    logIn,
    signUp,
    getUserData,
    updateUser,
    verifyOtpAndCompleteRegistration,
    resendOTP
}