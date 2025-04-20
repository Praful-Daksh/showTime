const Event = require('../models/events')
const mongoose = require('mongoose')

const createEvent = async (req, res) => {
    try {
        const user = req.user.id
        const { title, date,city, venue, access, publish } = req.body;
        const eventModel = new Event({ title, date, user, city, venue, access, publish })
        const event = await eventModel.save()
        res.status(201).json({ message: 'Event Recorded Successfully', sucess: true }
        )
    }
    catch (err) {
        console.log('Event Saving faile', err)
        res.status(500).json({ message: "Some Internal Error Occured", sucess: false })
    }
}

const getUpcomingEvents = async (req, res) => {
    try {
        const userId = req.user.id
        console.log(userId)
        const currentDate = new Date()
        const upcomingEvents = await Event.find({ user: userId , date: { $gte: currentDate } })
        if(upcomingEvents.length > 0){
            return res.status(200).json({ message: 'Upcoming Events', sucess: true, upcomingEvents})
        }else{
            return res.status(200).json({messge:'No upcoming Events Found',sucess:false,upcomingEvents})
        }
    }
    catch (err) {
        console.log('Event Fetching failed', err)
        return res.status(500).json({message: "Some Internal Error Occured", sucess: false})
    }
}


module.exports = {createEvent,getUpcomingEvents};