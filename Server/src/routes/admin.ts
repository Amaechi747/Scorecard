import express, { Request, Response, NextFunction } from "express";
import {validateAdminDetails} from '../utils/adminInputValidator';
import {validateAdminUpdateDetails} from '../utils/adminUpdateValidator';
import {createAdmin, editAdmin} from '../controllers/adminController';
import { createDecadev, updateDecadev, deleteDecadev } from '../controllers/adminServices'
import { HttpError } from "http-errors";

const router = express.Router();

/* Create Admin */

router.post('/create_user', validateAdminDetails, createAdmin);
router.patch('/edit/:id', validateAdminUpdateDetails, editAdmin);


/*Admin Create Decadev */

router.post('/create_decadev', createDecadev);
router.patch('/edit_decadev/:id', updateDecadev);

/*Delete Decadev */
router.delete('/delete_decadev/:id', deleteDecadev);


export default router;
