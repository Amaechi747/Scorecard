"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recoveryController_1 = require("../controllers/recoveryController");
const recoveryValidator_1 = require("../utils/recoveryValidator");
const isAthenticated_1 = require("../controllers/middleware/isAthenticated");
const router = express_1.default.Router();
/* User forgot password */
router.post('/forgot_password', isAthenticated_1.isAthenticated, recoveryValidator_1.validateEmail, recoveryController_1.forgotPassword);
/* User reset password
-----------------------
1. receives the user's id from invisible form input.
*/
router.post('/reset_password', isAthenticated_1.isAthenticated, recoveryValidator_1.validatePasswordUpdateInput, recoveryController_1.resetPassword);
exports.default = router;
