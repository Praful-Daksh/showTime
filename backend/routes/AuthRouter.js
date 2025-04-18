const express = require('express')
const router = express.Router();
const { registerValidation, LoginValidation } = require('../Middleware/AuthValidation.js')
const { signUp, logIn } = require('../Controllers/AuthController.js')

router.post('/login', LoginValidation, logIn);
router.post('/register', registerValidation, signUp)

module.exports = router