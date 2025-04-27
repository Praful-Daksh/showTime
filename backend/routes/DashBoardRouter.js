const ensureAuthenticated = require('../Middleware/Auth')
const {createEvent,getUpcomingEvents,updateEvent,deleteEvent} = require('../Controllers/DashboardController')
const createEventValidation = require('../Middleware/DashboardValidation')
const router = require('express').Router();

router.get('/home',ensureAuthenticated,getUpcomingEvents)
router.post('/newEvent',ensureAuthenticated,createEventValidation,createEvent)
router.patch('/allEvents/:id',ensureAuthenticated,createEventValidation,updateEvent)
router.delete('/allEvents/delete/:id',ensureAuthenticated,deleteEvent)
module.exports = router;