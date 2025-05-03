const express = require('express')
const Authrouter = express.Router();
const ensureAuthenticated  = require('../Middleware/Auth.js')
const { registerValidation, LoginValidation } = require('../Middleware/AuthValidation.js')
const { signUp, logIn, getUserData } = require('../Controllers/AuthController.js')

Authrouter.post('/login', LoginValidation, logIn);
Authrouter.post('/register', registerValidation, signUp)
Authrouter.get('/user', ensureAuthenticated, getUserData)
module.exports = Authrouter