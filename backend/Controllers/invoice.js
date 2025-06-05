const pdf = require('pdf-creator-node')
const fs = require('fs')
const path = require('path')
const Order = require('../models/Order.js')
const Ticket = require('../models/tickets.js')
const { format } = require('date-fns')

const getInvoiceDetails = async (orderId) => {
    try {
        const order = await Order.findOne({ razorpayOrderId: orderId });
        if (!order) {
            return null;
        }
        const showDetails = await Ticket.findById(order.showId);
        if (!showDetails) {
            return null;
        }

        const invoiceData = {
            orderId: order.razorpayOrderId,
            classicQuantity: order.classicQuantity,
            vipQuantity: order.vipQuantity,
            totalAmount: order.totalAmount,
            totalTickets: order.classicQuantity + order.vipQuantity,
            ticketName: showDetails.ticketName,
            showCity: showDetails.showCity,
            showDate: format(showDetails.showDate,'MM/dd/yyyy, HH:mm'),
            showVenue: showDetails.showVenue,
            price: showDetails.price,
            vipPrice: showDetails.vipPrice,
            createdAt: format(order.createdAt,'MM/dd/yyyy, HH:mm'),
        };

        return invoiceData;

    } catch (error) {
        console.error('Error fetching invoice details:', error);
        return null;
    }
}

const generateInvoice = async (req, res) => {
    const orderId = req.body.orderId;
    try {
        const invoiceData = await getInvoiceDetails(orderId);
        if (!invoiceData) {
            return res.status(404).json({ error: 'Invoice data not found' });
        }

        const html = fs.readFileSync(path.join(__dirname, '../template.html'), 'utf8');

        const document = {
            html: html,
            data: invoiceData,
            type: 'buffer'
        };

        const options = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm',
        };

        const pdfBuffer = await pdf.create(document, options);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${invoiceData.ticketName}-${invoiceData.orderId}.pdf`,
            'Content-Length': pdfBuffer.length
        });

        res.send(pdfBuffer);

    } catch (error) {
        console.error('Error generating invoice:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    generateInvoice
};