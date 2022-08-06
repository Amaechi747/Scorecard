import express, { Request, Response, NextFunction } from "express";
import {validateAdminDetails} from '../utils/adminInputValidator';
import {validateAdminUpdateDetails} from '../utils/adminUpdateValidator';

import {addStack, createAdmin, deleteStack, editAdmin, editStack, viewAllStack, activateAdmin, verifyAdmin, deactivateAdmin, deleteAdmin} from '../controllers/adminController';

import { HttpError } from "http-errors";

const router = express.Router();

/* Create Admin */

router.post('/create_user', validateAdminDetails, createAdmin);
router.patch('/edit/:id', validateAdminUpdateDetails, editAdmin);
router.post('/activate/:id', activateAdmin);
router.get('/verify', verifyAdmin);
router.patch('/deactivate/:id', deactivateAdmin);
router.delete('/delete/:id', deleteAdmin);

/* View All Stack */
router.get('/view_all_stack', viewAllStack);
/* Create Stack */
router.post('/create_stack', addStack);

/* Edit Stack */
router.put('/edit_stack/:id', editStack);

/* Delete Stack */
router.delete('/delete_stack/:id', deleteStack)


export default router;
