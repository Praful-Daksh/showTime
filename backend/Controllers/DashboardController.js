const Event = require('../models/events')
const mongoose = require('mongoose')
const Tasks = require('../models/tasks')
const Ticket = require('../models/tickets')

const createEvent = async (req, res) => {
    try {
        const user = req.user.id
        const { title, date, description, city, venue, access, publish, category } = req.body;
        const eventModel = new Event({ title, date, user, description, city, venue, access, publish, category })
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
    const { title, description, venue, city, access, date, user, category } = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, { title, description, venue, city, access, date, user, category }, { new: true });
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
        if (event.publish) {
            await Ticket.deleteOne({ eId: eventId });
        }
        await Event.deleteOne({ _id: eventId });
        await Tasks.deleteMany({ eId: eventId });
        return res.status(200).json({ message: 'Event Deleted Successfully', success: true })
    } catch (error) {
        console.error("Error deleting event: ", error);
        return res.status(500).json({ message: "Some Internal Error Occured", success: false });
    }
}

const getTasks = async (req, res) => {
    try {
        const eventId = req.params.id;
        const tasks = await Tasks.find({ eId: eventId }) || [];
        return res.status(200).json({ message: 'All tasks are -', success: true, tasks })
    } catch (err) {
        console.error("Error fetching tasks:", err);
        return res.status(204).json({ message: 'NO tasks', success: false });
    }
}

const addTask = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { newTask } = req.body;
        const addedTask = new Tasks({ task: newTask, eId: eventId });
        await addedTask.save();

        return res.status(200).json({ message: 'Task Added', success: true })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Some Internal Error Occured", success: false });
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Tasks.deleteOne({ _id: taskId });
        return res.status(200).json({ message: 'Task Removed', success: true })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Some Internal Error Occured", success: false });
    }
}

const validateEventId = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(400).json({ message: 'Something went wrong', success: false });
        }
        return res.status(200).json({ message: 'Event found', success: true })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Some Internal Error Occured", success: false });
    }
}

const publishTicket = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { ticketData, eventData } = req.body;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(400).json({ message: 'Something went wrong', success: false });
        }
        if (event.publish) {
            return res.status(400).json({ message: 'Ticket already published', success: false });
        }
        const ticket = new Ticket({ ...ticketData, eId: eventId, showCity: eventData.city, showVenue: eventData.venue, showDate: eventData.date, description: eventData.description, category: eventData.category });
        await ticket.save();
        await Event.updateOne({ _id: eventId }, { $set: { publish: true } });
        return res.status(200).json({ message: 'Ticket Published', success: true })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Some Internal Error Occured", success: false });
    }
}

const getShowDetails = async (req, res) => {
    try {
        const showId = req.params.id;
        const show = Ticket.findById(showId);
        if (!show) {
            return res.status(400).json({ message: 'Something went wrong', success: false });
        }
        return res.status(200).json({ message: 'Show details fetched successfully', success: true, show })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Some Internal Error Occured", success: false });
    }
}





module.exports = {
    createEvent,
    getUpcomingEvents,
    updateEvent,
    deleteEvent,
    getTasks,
    addTask,
    deleteTask,
    validateEventId,
    publishTicket,
    getShowDetails
};