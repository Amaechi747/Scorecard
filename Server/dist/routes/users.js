"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const decadevController_1 = require("../controllers/decadevController");
const authentication_1 = require("../controllers/authentication");
const loginValidation_1 = require("../utils/inputValidation/loginValidation");
const passwordUpdateValidation_1 = require("../utils/inputValidation/passwordUpdateValidation");
const isAthenticated_1 = require("../controllers/middleware/isAthenticated");
const router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/get_current_performance/:id', decadevController_1.getCurrentPerformance);
/* Verify Decadev */
router.get('/verify', decadevController_1.verifyDecadev);
/*********** Get performance tracker *********/
router.get('/scores/weekly/:id', isAthenticated_1.isAthenticated, decadevController_1.performanceTracker);
router.get('/get_current_performance/:id', isAthenticated_1.isAthenticated, decadevController_1.getCurrentPerformance);
/****** Login User *****/
router.post('/login', loginValidation_1.loginDetailsValidation, authentication_1.loginUser);
router.post('/update_password', passwordUpdateValidation_1.updatePasswordDetailsValidation, isAthenticated_1.isAthenticated, decadevController_1.updatePassword);
/* get cummulative performance of a student with an ID */
router.get('/cummulative_performance/:id', decadevController_1.getCummulativePerformance);
exports.default = router;
