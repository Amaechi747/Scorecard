"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminInputValidator_1 = require("../utils/inputValidation/adminInputValidator");
const imageUpload_1 = __importDefault(require("../utils/imageUpload"));
const isAthenticated_1 = require("../controllers/middleware/isAthenticated");
const addImageHandler_1 = __importDefault(require("../controllers/middleware/addImageHandler"));
const adminUpdateValidator_1 = require("../utils/inputValidation/adminUpdateValidator");
const decadevController_1 = require("../controllers/decadevController");
const decadevUpdateValidator_1 = require("../utils/decadevUpdateValidator");
const adminController_1 = require("../controllers/adminController");
const stackController_1 = require("../controllers/stackController");
const decadevValidator_1 = require("../utils/inputValidation/decadevValidator");
const router = express_1.default.Router();
/* Create Admin */
router.get("/", adminController_1.getAdmin);
router.post("/create_user", adminInputValidator_1.validateAdminDetails, adminController_1.createAdmin);
/* Update Admin */
router.patch("/edit/:id", isAthenticated_1.isAthenticated, adminUpdateValidator_1.validateAdminUpdateDetails, adminController_1.editAdmin);
/* Activate Admin */
router.post("/activate/:id", isAthenticated_1.isAthenticated, adminController_1.activateAdmin);
/* Verify Admin */
router.get("/verify", isAthenticated_1.isAthenticated, adminController_1.verifyAdmin);
/* Deactivate Admin */
router.patch("/deactivate/:id", isAthenticated_1.isAthenticated, adminController_1.deactivateAdmin);
/* Delete Admin */
router.delete("/delete/:id", isAthenticated_1.isAthenticated, adminController_1.deleteAdmin);
/* View All Stack */
router.get("/view_all_stack", isAthenticated_1.isAthenticated, stackController_1.viewAllStack);
// router.get("/view_all_stack/", isAthenticated, viewAllStackById);
/* Create Stack */
router.post("/create_stack", imageUpload_1.default.single("image"), addImageHandler_1.default, adminInputValidator_1.validateStackInput, stackController_1.addStack);
/*Admin Create || Edit || Delete Decadev */
/* Create Decadev */
router.get("/all_decadev", decadevController_1.getDecadev);
router.post("/create_decadev", isAthenticated_1.isAthenticated, decadevValidator_1.validateDecadevDetails, decadevController_1.createDecadev);
/* Edit Decadev */
router.patch("/edit_decadev/:id", isAthenticated_1.isAthenticated, decadevUpdateValidator_1.validateDecadevUpdateDetails, decadevController_1.editDecadev);
/*Delete Decadev */
router.delete("/delete_decadev/:id", isAthenticated_1.isAthenticated, decadevController_1.deleteDecadev);
/* Activate Decadev */
router.post("/activate_decadev/:id", isAthenticated_1.isAthenticated, decadevController_1.activateDecadev);
/* Deactivate Decadev */
router.patch("/deactivate_decadev/:id", isAthenticated_1.isAthenticated, decadevController_1.deactivateDecadev);
/////////////////////////////////////////////////
/* Edit Stack */
router.put("/edit_stack/:id", isAthenticated_1.isAthenticated, stackController_1.editStack);
/* Delete Stack */
router.delete("/delete_stack/:id", isAthenticated_1.isAthenticated, stackController_1.deleteStack);
////////////////////////////////////////////////
/* View Profile */
router.get("/profile/:id", isAthenticated_1.isAthenticated, adminController_1.getAdminProfile);
/* Change Password */
router.put("/update_password/:id", isAthenticated_1.isAthenticated, adminInputValidator_1.validateAdminPasswordUpdateInput, adminController_1.updateAdminPassword);
/* Upload Image */
router.put("/upload/:id", isAthenticated_1.isAthenticated, imageUpload_1.default.single("image"), adminController_1.addNewImage);
///////////////////
/* Add Scores using the user id */
router.put("/add_score/:id", isAthenticated_1.isAthenticated, adminInputValidator_1.validateScoreInput, decadevController_1.addScoreForDecadev);
/* Filter score */
router.get("/filter_score/:id", isAthenticated_1.isAthenticated, adminController_1.filterScores);
/*Search name */
router.get("/search/:id", isAthenticated_1.isAthenticated, adminController_1.searchScores);
exports.default = router;
