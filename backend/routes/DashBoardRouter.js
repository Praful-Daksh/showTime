const ensureAuthenticated = require('../Middleware/Auth')
const createEvent = require('../Controllers/DashboardController')
const createEventValidation = require('../Middleware/DashboardValidation')
const Event = require('../models/events')
const router = require('express').Router();

router.get('/home',ensureAuthenticated,(req,res)=>{
    console.log(req.user)
    const Id = req.user.id;

    return res.status(200)
    .json({Id})
})
router.post('/newEvent',ensureAuthenticated,createEventValidation,createEvent)


module.exports = router;