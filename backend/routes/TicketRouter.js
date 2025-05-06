const express = require('express')
const TicketRouter = express.Router();
const Ticket = require('../models/tickets.js')

TicketRouter.get('/allTickets', async (req, res) => {
    try {
        const Tickets = await Ticket.find();
        if (Tickets) {
            return res.status(200).json({ message: 'All Available Tickets are -', success: true, Tickets })
        } else {
            return res.status(204).json({ message: 'No tickets', success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(502).send('Internal Server Error');
    }
});




module.exports = TicketRouter;