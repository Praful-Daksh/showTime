const express = require('express');
const PaymentRouter = express.Router();
const ensureAuthenticated = require('../Middleware/Auth.js')
const { verifyOrder, createOrder ,paymentStatus , cancelOrder} = require('../Controllers/PaymentController.js');

PaymentRouter.post('/orders',ensureAuthenticated,createOrder);

PaymentRouter.post('/verify',verifyOrder);

PaymentRouter.get('/status',paymentStatus)

PaymentRouter.post('/cancel', cancelOrder)

module.exports = PaymentRouter;

