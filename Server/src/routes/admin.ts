import express from "express";
import {validateAdminDetails, validateAdminPasswordUpdateInput} from '../utils/adminInputValidator';
import parser from "../utils/imageUpload";
import {validateAdminUpdateDetails} from '../utils/adminUpdateValidator';
import { 
    createAdmin, 
    editAdmin, 
    activateAdmin, 
    getAdmin, 
    verifyAdmin, 
    deactivateAdmin, 
    deleteAdmin, 
    getAdminProfile, 
    addNewImage, 
    updateAdminPassword
} from '../controllers/adminController';
import {viewAllStack,addStack,editStack,deleteStack} from '../controllers/stackController';


const router = express.Router();

/* Create Admin */
router.get('/',getAdmin);
router.post('/create_user', validateAdminDetails, createAdmin);

/* Update Admin */
router.patch('/edit/:id', validateAdminUpdateDetails, editAdmin);

/* Activate Admin */
router.post('/activate/:id', activateAdmin);

/* Verify Admin */
router.get('/verify', verifyAdmin);

/* Deactivate Admin */
router.patch('/deactivate/:id', deactivateAdmin);

/* Delete Admin */
router.delete('/delete/:id', deleteAdmin);

/* View All Stack */
router.get('/view_all_stack', viewAllStack);

/* Create Stack */
router.post('/create_stack', addStack);

/* Edit Stack */
router.put('/edit_stack/:id', editStack);

/* Delete Stack */
router.delete('/delete_stack/:id', deleteStack)

/* View Profile */
router.get('/profile/:id', getAdminProfile)

/* Change Password */
router.put('/update_password/:id', validateAdminPasswordUpdateInput, updateAdminPassword)

/* Upload Image */
router.put('/upload/:id', parser.single('image'), addNewImage )

export default router;
