import express, { Request, Response, NextFunction } from "express";
import { verifyDecadev, updatePassword, performanceTracker, getCurrentPerformance } from "../controllers/decadevController";
import { loginUser } from "../controllers/authentication";
import {loginDetailsValidation} from '../utils/inputValidation/loginValidation';
import {updatePasswordDetailsValidation} from '../utils/inputValidation/passwordUpdateValidation';

import {isAthenticated} from '../controllers/middleware/isAthenticated';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});


/* Verify Decadev */
router.get('/verify', verifyDecadev);

/*********** Get performance tracker *********/
router.get('/scores/weekly/:id', performanceTracker)
router.get('/get_current_performance/:id', getCurrentPerformance)

/****** Login User *****/        
router.post('/login', loginDetailsValidation, loginUser); 

router.post('/update_password', updatePasswordDetailsValidation, updatePassword);






export default router;
