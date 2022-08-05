import express, { Request, Response, NextFunction } from "express";
import {validateAdminDetails} from '../utils/adminInputValidator';
import {validateAdminUpdateDetails} from '../utils/adminUpdateValidator';
import {createAdmin, editAdmin} from '../controllers/adminController';
import { HttpError } from "http-errors";

const router = express.Router();

/* Create Admin */

router.post('/create_user', validateAdminDetails, createAdmin);
router.patch('/edit/:id', validateAdminUpdateDetails, editAdmin);







export default router;
