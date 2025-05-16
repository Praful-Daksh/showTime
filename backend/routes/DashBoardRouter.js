const ensureAuthenticated = require('../Middleware/Auth')
const {
    createEvent,
    getUpcomingEvents,
    updateEvent,
    deleteEvent,
    getTasks,
    addTask,
    deleteTask,
    validateEventId,
    publishTicket,
    getPublishedEvents,
    getShow,
    getTicket
} = require('../Controllers/DashboardController')
const {
    createEventValidation,
    publishEventValidation
} = require('../Middleware/DashboardValidation')
const router = require('express').Router();

router.get('/home', ensureAuthenticated, getUpcomingEvents)
router.get('/allEvents/tasks/:id', ensureAuthenticated, getTasks)
router.get('/allEvents/verify/:id', ensureAuthenticated, validateEventId)
router.get('/published/events', ensureAuthenticated, getPublishedEvents)
router.get('/published/events/:eventId', ensureAuthenticated, getShow)
router.get('/checkout/:showId', ensureAuthenticated, getTicket)
router.get('/', ensureAuthenticated, (req, res) => {
    return res.json({ message: 'User Authentication Successfull', success: true });
})


router.post('/allEvents/tasks/add/:id', ensureAuthenticated, addTask)
router.post('/publishTicket/:id', ensureAuthenticated, publishEventValidation, publishTicket)
router.post('/newEvent', ensureAuthenticated, createEventValidation, createEvent)


router.delete('/allEvents/delete/:id', ensureAuthenticated, deleteEvent)
router.delete('/allEvents/tasks/delete/:id', ensureAuthenticated, deleteTask)


router.patch('/allEvents/update/:id', ensureAuthenticated, createEventValidation, updateEvent)
module.exports = router;