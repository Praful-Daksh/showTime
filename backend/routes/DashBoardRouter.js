const ensureAuthenticated = require('../Middleware/Auth')
const {createEvent,getUpcomingEvents} = require('../Controllers/DashboardController')
const createEventValidation = require('../Middleware/DashboardValidation')
const router = require('express').Router();

router.get('/home',ensureAuthenticated,getUpcomingEvents)
router.post('/newEvent',ensureAuthenticated,createEventValidation,createEvent)
router.get('/allEvents',ensureAuthenticated,(req,res)=>{
    return res.status(200).json({ message: 'Authenticated Succesfully', success: true})
})
module.exports = router;