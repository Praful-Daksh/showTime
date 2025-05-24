const express = require('express')
const TicketRouter = express.Router();
const Ticket = require('../models/tickets.js')

TicketRouter.get('/allTickets', async (req, res) => {
    try {
        const Tickets = await Ticket.find();
        if (Tickets && Tickets.length > 0) {
                const shows = Tickets.map(ticket => {
                    return {
                        id: ticket._id,
                        ticketName: ticket.ticketName,
                        description: ticket.description,
                        price: ticket.price,
                        showDate: ticket.showDate,
                        category: ticket.category,
                        showVenue: ticket.showVenue,
                        showCity: ticket.showCity,
                        price: ticket.price,
                    }
                })
                return res.status(200).json({ message: 'All tickets fetched', success: true, shows })
        } else {
            return res.status(204).json({ message: 'No tickets', success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(502).send('Internal Server Error');
    }
});




module.exports = TicketRouter;