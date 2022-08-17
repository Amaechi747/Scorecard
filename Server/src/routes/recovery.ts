import express from 'express';
import { forgotPassword, resetPassword } from "../controllers/recoveryController";
import { validateEmail, validatePasswordUpdateInput } from "../utils/recoveryValidator";

const router = express.Router()


/* User forgot password */
router.post('/forgot_password', validateEmail, forgotPassword) 

/* User reset password 
-----------------------
1. receives the user's id from invisible form input.
*/
router.post('/reset_password', validatePasswordUpdateInput, resetPassword)


export default router;