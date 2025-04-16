import express from 'express'
const router = express.Router();
import {registerValidation} from '../Middleware/AuthValidation.js'
 import {signUp} from '../Controllers/AuthController.js'

router.post('/login',(req,rs)=>{
    console.log('lognnnnn')
})

router.post('/register',registerValidation,signUp)

export default router;