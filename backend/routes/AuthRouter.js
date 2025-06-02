const express = require('express')
const Authrouter = express.Router();
const ensureAuthenticated = require('../Middleware/Auth.js')
const { registerValidation, LoginValidation } = require('../Middleware/AuthValidation.js')
const { signUp, logIn, getUserData, updateUser, verifyOtpAndCompleteRegistration, resendOTP } = require('../Controllers/AuthController.js')



Authrouter.post('/login', LoginValidation, logIn);
Authrouter.post('/register', registerValidation, signUp)
Authrouter.post('/verify-otp',verifyOtpAndCompleteRegistration)
Authrouter.post('/resend-otp', resendOTP)

Authrouter.get('/user', ensureAuthenticated, getUserData)


Authrouter.put('/updateUser', ensureAuthenticated, updateUser)


module.exports = Authrouter