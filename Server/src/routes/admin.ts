import express, { Request, Response, NextFunction } from "express";
import {validateAdminDetails, validateAdminPasswordUpdateInput} from '../utils/adminInputValidator';
import {addAdmin, getAdminProfile, addNewImage, updateAdminPassword} from '../controllers/adminController';
import parser from "../utils/imageUpload";
import { HttpError } from "http-errors";

const router = express.Router();

/* Create Admin */
router.post('/create_user', validateAdminDetails, addAdmin);

/* View Profile */
router.get('/profile/:id', getAdminProfile)

/* Change Password */
router.put('/update_password/:id', validateAdminPasswordUpdateInput, updateAdminPassword)

/* Upload Image */
router.put('/upload/:id', parser.single('image'), addNewImage )

export default router;
