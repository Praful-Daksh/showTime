const ensureAuthenticated = require('../Middleware/Auth')
const {
    createEvent,
    getUpcomingEvents,
    updateEvent,
    deleteEvent,
    getTasks,
    addTask,
    deleteTask,
    validateEventId
} = require('../Controllers/DashboardController')
const createEventValidation = require('../Middleware/DashboardValidation')
const router = require('express').Router();

router.get('/home', ensureAuthenticated, getUpcomingEvents)
router.post('/newEvent', ensureAuthenticated, createEventValidation, createEvent)
router.patch('/allEvents/update/:id', ensureAuthenticated, createEventValidation, updateEvent)
router.delete('/allEvents/delete/:id', ensureAuthenticated, deleteEvent)
router.get('/allEvents/tasks/:id', ensureAuthenticated, getTasks)
router.post('/allEvents/tasks/add/:id', ensureAuthenticated, addTask)
router.delete('/allEvents/tasks/delete/:id',ensureAuthenticated,deleteTask)
router.get('/allEvents/verify/:id',ensureAuthenticated,validateEventId)
module.exports = router;