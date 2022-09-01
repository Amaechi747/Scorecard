import express, { Request, Response, NextFunction } from "express";
import parser from "../utils/imageUpload";
import { 
  verifyDecadev, 
  updatePassword, 
  performanceTracker, 
  getCurrentPerformance ,
  getCummulativePerformance,
  getDevProfile,
  editDecadev,
  addNewImage
} from "../controllers/decadevController";
import {validateAdminUpdateDetails} from '../utils/inputValidation/adminUpdateValidator';
import { loginUser } from "../controllers/authentication";
import {loginDetailsValidation} from '../utils/inputValidation/loginValidation';
import {updatePasswordDetailsValidation} from '../utils/inputValidation/passwordUpdateValidation';

import {isAthenticated} from '../controllers/middleware/isAthenticated';



const router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});

// router.get('/get_current_performance/:id', getCurrentPerformance)
/* Verify Decadev */
router.get('/verify', verifyDecadev);
router.get("/profile/:id", getDevProfile)

/*********** Get performance tracker *********/
router.get('/scores/weekly/:id', isAthenticated, performanceTracker)
router.get('/get_current_performance/:id', isAthenticated, getCurrentPerformance)

/****** Login User *****/        
router.post('/login', loginDetailsValidation, loginUser); 

router.patch("/edit/:id",isAthenticated, validateAdminUpdateDetails, editDecadev);
/* Upload Image */
router.put("/upload/:id", isAthenticated, parser.single("image"), addNewImage);

router.post('/update_password', updatePasswordDetailsValidation, isAthenticated, updatePassword);

/* get cummulative performance of a student with an ID */
router.get('/cummulative_performance/:id',getCummulativePerformance)



export default router;
