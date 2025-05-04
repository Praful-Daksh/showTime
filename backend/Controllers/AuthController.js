const User = require('../models/Users.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(409)
                .json({ message: 'User is already registered', success: false })
        }
        const userModel = new User({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({ message: "Register Success", success: true })
    } catch (err) {
        res.status(500)
            .json({ message: "Internal Server Error", success: false })
    }
}

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
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({ message: "Internal Server Error", success: false })
    }
}

const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404)
                .json({ message: 'User not found', success: false })
        }
        res.status(200)
            .json({ message: "User Data", success: true, "user": { "name": user.name, "email": user.email } })
    } catch (err) {
        res.status(500)
            .json({ message: "Internal Server Error", success: false })
    }
}

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

        res.status(200).json({ message: "User updated successfully", success: true , user: { name: updatedUser.name, email: updatedUser.email } });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

module.exports = { logIn, signUp, getUserData, updateUser }