const express = require('express');
const PaymentRouter = express.Router();
const ensureAuthenticated = require('../Middleware/Auth.js')
const { verifyOrder, createOrder } = require('../Controllers/PaymentController.js');

PaymentRouter.post('/orders',ensureAuthenticated,createOrder);

PaymentRouter.post('/verify',verifyOrder);

module.exports = PaymentRouter;
