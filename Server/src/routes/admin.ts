import express from "express";
import {validateAdminDetails, validateAdminPasswordUpdateInput, validateScoreInput, validateStackInput} from '../utils/inputValidation/adminInputValidator';
import parser from "../utils/imageUpload";
import {isAthenticated} from "../controllers/middleware/isAthenticated";

import {validateAdminUpdateDetails} from '../utils/inputValidation/adminUpdateValidator';
import { 
    createDecadev, 
    editDecadev, 
    deleteDecadev, 
    activateDecadev, 
    deactivateDecadev,
    addScoreForDecadev,
    getDecadev
} from '../controllers/decadevController'
import { validateDecadevUpdateDetails } from "../utils/decadevUpdateValidator";
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
  updateAdminPassword,
  filterScores,
  searchScores,
} from "../controllers/adminController";

import {
  viewAllStack,
  addStack,
  editStack,
  deleteStack,
} from "../controllers/stackController";
import { validateDecadevDetails } from "../utils/inputValidation/decadevValidator";


const router = express.Router();

/* Create Admin */
router.get("/", getAdmin);
router.post("/create_user", validateAdminDetails, createAdmin);

/* Update Admin */
router.patch("/edit/:id",isAthenticated, validateAdminUpdateDetails, editAdmin);

/* Activate Admin */
router.post("/activate/:id",isAthenticated, activateAdmin);

/* Verify Admin */
router.get("/verify", isAthenticated, verifyAdmin);

/* Deactivate Admin */
router.patch("/deactivate/:id", isAthenticated, deactivateAdmin);

/* Delete Admin */
router.delete("/delete/:id", isAthenticated, deleteAdmin);

/* View All Stack */
router.get("/view_all_stack", isAthenticated, viewAllStack);

/* Create Stack */
router.post("/create_stack", isAthenticated, validateStackInput, addStack);

/*Admin Create || Edit || Delete Decadev */
/* Create Decadev */
router.get("/all_decadev", getDecadev);
router.post("/create_decadev", isAthenticated,  validateDecadevDetails, createDecadev);

/* Edit Decadev */
router.patch("/edit_decadev/:id", isAthenticated, validateDecadevUpdateDetails, editDecadev);

/*Delete Decadev */
router.delete("/delete_decadev/:id", isAthenticated, deleteDecadev);

/* Activate Decadev */
router.post("/activate_decadev/:id", isAthenticated, activateDecadev);

/* Deactivate Decadev */
router.patch("/deactivate_decadev/:id", isAthenticated,  deactivateDecadev);

/////////////////////////////////////////////////

/* Edit Stack */
router.put("/edit_stack/:id",isAthenticated,  editStack);

/* Delete Stack */
router.delete("/delete_stack/:id", isAthenticated,  deleteStack);

////////////////////////////////////////////////

/* View Profile */
router.get("/profile/:id", isAthenticated,  getAdminProfile);

/* Change Password */
router.put(
  "/update_password/:id",
  isAthenticated,
  validateAdminPasswordUpdateInput,
  updateAdminPassword
);

/* Upload Image */
router.put("/upload/:id", isAthenticated, parser.single("image"), addNewImage);

///////////////////
/* Add Scores using the user id */
router.put("/add_score/:id", isAthenticated, validateScoreInput, addScoreForDecadev);

/* Filter score */
router.get("/filter_score/:id", isAthenticated, filterScores)

/*Search name */
router.get("/search/:id", isAthenticated, searchScores)

export default router;
