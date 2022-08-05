import express, { Request, Response, NextFunction } from "express";
import {validateAdminDetails} from '../utils/adminInputValidator';
import {addAdmin} from '../controllers/adminController';
import { HttpError } from "http-errors";

const router = express.Router();

/* Create Admin */
router.post('/create_user', validateAdminDetails, addAdmin);


export default router;
