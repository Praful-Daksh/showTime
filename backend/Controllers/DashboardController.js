const Event = require('../models/events')


const createEvent = async (req, res) => {
    try {
        const { title, date, user, city, venue, access, publish } = req.body;
        const eventModel = new Event({ title, date, user, city, venue, access, publish })
        const event = await eventModel.save()
        res.status(201).json({ message:'Event Recorded Successfully',sucess:true }
        )
    }
    catch (err) {
        console.log('Event Saving faile',err)
        res.status(500).json({ message: "Some Internal Error Occured", sucess: false })
    }
}

module.exports = createEvent;