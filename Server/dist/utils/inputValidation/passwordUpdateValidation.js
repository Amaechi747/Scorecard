"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordDetailsValidation = void 0;
const joi_1 = __importStar(require("joi"));
const passwordUpdateSchema = joi_1.default.object({
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    confirmPassword: joi_1.default.ref('password')
});
//Validate data
const updatePasswordDetailsValidation = async function (req, res, next) {
    try {
        // Validate input details
        const data = req.body;
        delete req.body.user;
        const valid = await passwordUpdateSchema
            .validateAsync({ ...data });
        if (valid) {
            next();
        }
    }
    catch (error) {
        // Send Error to handler
        if (error instanceof joi_1.ValidationError) {
            const { message } = error.details[0];
            next(new Error(message));
        }
    }
};
exports.updatePasswordDetailsValidation = updatePasswordDetailsValidation;
