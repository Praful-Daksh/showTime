const ensureAuthenticated = require('../Middleware/Auth')
const {createEvent,getUpcomingEvents} = require('../Controllers/DashboardController')
const createEventValidation = require('../Middleware/DashboardValidation')
const router = require('express').Router();

router.get('/home',ensureAuthenticated,getUpcomingEvents)
router.post('/newEvent',ensureAuthenticated,createEventValidation,createEvent)
module.exports = router;