import express from 'express'
const router = express.Router();
import {registerValidation,LoginValidation} from '../Middleware/AuthValidation.js'
 import {signUp,logIn} from '../Controllers/AuthController.js'

router.post('/login', LoginValidation,logIn);
router.post('/register',registerValidation,signUp)

export default router;