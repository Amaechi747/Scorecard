import express from 'express';
import { forgotPassword, resetPassword } from "../controllers/recoveryController";
import { validateEmail, validatePasswordUpdateInput } from "../utils/recoveryValidator";
import {isAthenticated} from "../controllers/middleware/isAthenticated"

const router = express.Router()


/* User forgot password */
router.post('/forgot_password', isAthenticated, validateEmail, forgotPassword) 

/* User reset password 
-----------------------
1. receives the user's id from invisible form input.
*/
router.post('/reset_password',isAthenticated, validatePasswordUpdateInput, resetPassword)


export default router;