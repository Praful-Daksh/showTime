const Event = require('../models/events')
const mongoose = require('mongoose')

const createEvent = async (req, res) => {
    try {
        const user = req.user.id
        const { title, date, description, city, venue, access, publish } = req.body;
        const eventModel = new Event({ title, date, user, description, city, venue, access, publish })
        const event = await eventModel.save()
        res.status(201).json({ message: 'Event Recorded Successfully', success: true }
        )
    }
    catch (err) {
        console.log('Event Saving faile', err)
        res.status(500).json({ message: "Some Internal Error Occured", success: false })
    }
}


const getUpcomingEvents = async (req, res) => {
    try {
        const userId = req.user.id
        console.log(userId)
        const currentDate = new Date()
        const upcomingEvents = await Event.find({ user: userId })
        if (upcomingEvents.length > 0) {
            return res.status(200).json({ message: 'Upcoming Events', success: true, upcomingEvents })
        } else {
            return res.status(200).json({ messge: 'No upcoming Events Found', success: true, upcomingEvents })
        }
    }
    catch (err) {
        console.log('Event Fetching failed', err)
        return res.status(500).json({ message: "Some Internal Error Occured", success: false })
    }
}

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, venue, city, access, date, user } = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, { title, description, venue, city, access, date, user }, { new: true });
        if (!updatedEvent) {
            return res.status(500).json({ message: "Some Internal Error Occured", success: false });
        }
        return res.status(200).json({ message: 'Event Updated Successfully', success: true })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Some Internal Error Occured", success: false });
    }
}


const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);

        if (!event) {
            req.flash("error_msg", "Event not found");
            return res.status(500).json({ message: "Some Internal Error Occured", success: false });
        }
        // if (event.publish) {
        //     await Ticket.deleteOne({ eId: eventId });
        // }
        await Event.deleteOne({ _id: eventId });
        // await Tasks.deleteMany({ eId: eventId });
        return res.status(200).json({ message: 'Event Deleted Successfully', success: true })
    } catch (error) {
        console.error("Error deleting event: ", error);
        return res.status(500).json({ message: "Some Internal Error Occured", success: false });
    }
}
module.exports = { createEvent, getUpcomingEvents, updateEvent, deleteEvent };