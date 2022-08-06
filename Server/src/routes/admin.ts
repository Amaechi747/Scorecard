import express, { Request, Response, NextFunction } from "express";
import {validateAdminDetails} from '../utils/adminInputValidator';
import {validateAdminUpdateDetails} from '../utils/adminUpdateValidator';
import {activateAdmin, createAdmin, editAdmin, verifyAdmin, deactivateAdmin, deleteAdmin} from '../controllers/adminController';
import { HttpError } from "http-errors";

const router = express.Router();

/* Create Admin */

router.post('/create_user', validateAdminDetails, createAdmin);
router.patch('/edit/:id', validateAdminUpdateDetails, editAdmin);
router.post('/activate/:id', activateAdmin);
router.get('/verify', verifyAdmin);
router.patch('/deactivate/:id', deactivateAdmin);
router.delete('/delete/:id', deleteAdmin);





export default router;
