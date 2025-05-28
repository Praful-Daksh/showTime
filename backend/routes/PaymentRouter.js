const express = require('express');
const PaymentRouter = express.Router();
const ensureAuthenticated = require('../Middleware/Auth.js')
const { verifyOrder, createOrder ,paymentStatus} = require('../Controllers/PaymentController.js');

PaymentRouter.post('/orders',ensureAuthenticated,createOrder);

PaymentRouter.post('/verify',verifyOrder);

PaymentRouter.get('/status',paymentStatus)

module.exports = PaymentRouter;

