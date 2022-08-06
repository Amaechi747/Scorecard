"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminInputValidator_1 = require("../utils/adminInputValidator");
const adminUpdateValidator_1 = require("../utils/adminUpdateValidator");
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
/* Create Admin */
router.post('/create_user', adminInputValidator_1.validateAdminDetails, adminController_1.createAdmin);
router.patch('/edit/:id', adminUpdateValidator_1.validateAdminUpdateDetails, adminController_1.editAdmin);
router.post('/activate/:id', adminController_1.activateAdmin);
router.get('/verify', adminController_1.verifyAdmin);
router.patch('/deactivate/:id', adminController_1.deactivateAdmin);
router.delete('/delete/:id', adminController_1.deleteAdmin);
exports.default = router;
