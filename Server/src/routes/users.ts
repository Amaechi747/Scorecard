import express, { Request, Response, NextFunction } from "express";
import { forgotPassword, verifyDecadev } from "../controllers/decadevController";
import { validateDecadevEmail, validateDecadevPasswordUpdateInput } from "../utils/decadevValidator";
const router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});


/* Verify Decadev */
router.get('/verify', verifyDecadev);

/* Decadev forgot password */
router.post('/forgot_password', validateDecadevEmail, forgotPassword) 

/* Decadev reset password */
router.get('/reset_password', )
router.post('/reset_password', validateDecadevPasswordUpdateInput)

export default router;
