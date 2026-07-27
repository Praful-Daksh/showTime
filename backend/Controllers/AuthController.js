const User = require('../models/Users.js')
const Order = require('../models/Order.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { sendWelcomemail } = require('./Mailer.js')

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User is already registered', success: false });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPass
        });

        await newUser.save();

        try {
            await sendWelcomemail(email, name);
        } catch (mailErr) {
            console.error('Welcome email error:', mailErr);
        }

        return res.status(201).json({
            message: 'Account created successfully',
            success: true,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
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
        const ticketPurchased = await Order.find({ user: user._id, paymentVerified: true })
        if (ticketPurchased) {
            const purchasedTickets = ticketPurchased.map(ticket => ({
                orderId: ticket.razorpayOrderId,
                totalPrice: ticket.totalAmount,
                date: ticket.createdAt
            }));
            purchasedTickets.sort((a, b) => new Date(b.date) - new Date(a.date));
            return res.status(200)
                .json({
                    message: "User Data",
                    success: true,
                    "user": {
                        "name": user.name,
                        "email": user.email,
                        "ticketSold": user.ticketSold,
                        "revenueVip": user.revenueVip,
                        "revenueClassic": user.revenueClassic
                    },
                    "purchasedTickets": purchasedTickets
                })
        }

        res.status(200)
            .json({
                message: "User Data",
                success: true,
                "user": {
                    "name": user.name,
                    "email": user.email,
                    "ticketSold": user.ticketSold,
                    "revenueVip": user.revenueVip,
                    "revenueClassic": user.revenueClassic
                },
                "purchasedTickets": []
            })
    } catch (err) {
        console.error(err);
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


module.exports = {
    logIn,
    signUp,
    getUserData,
    updateUser
}