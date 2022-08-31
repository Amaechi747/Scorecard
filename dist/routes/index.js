"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("../controllers"));
const authentication_1 = require("../controllers/authentication");
const router = express_1.default.Router();
/* GET home page. */
router.get('/login', authentication_1.loginSuperAdmin);
/* GET home page. */
router.post('/admin/superuser', controllers_1.default);
exports.default = router;
