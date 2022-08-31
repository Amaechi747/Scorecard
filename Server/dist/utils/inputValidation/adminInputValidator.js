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
exports.validateScoreInput = exports.validateStackInput = exports.validateAdminPasswordUpdateInput = exports.validateAdminDetails = void 0;
const joi_1 = __importStar(require("joi"));
// const year = new Date().getFullYear();
// const maxSquadNo = ;
const adminSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    lastName: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['dev', 'com'] } }),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    confirmPassword: joi_1.default.ref('password'),
    phoneNo: joi_1.default.number(),
    squad: joi_1.default.number()
        .min(1),
    stack: joi_1.default.string(),
    status: joi_1.default.string(),
    role: joi_1.default.string()
        .required(),
});
// Validate Admin password update input
const adminPasswordUpdateSchema = joi_1.default.object({
    // password: Joi.string()
    //     .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    //     .required(),
    newPassword: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    confirmPassword: joi_1.default.ref('newPassword'),
});
//Validate user function
const validateAdminDetails = async function (req, res, next) {
    try {
        // Validate input details
        const data = req.body;
        const valid = await adminSchema
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
exports.validateAdminDetails = validateAdminDetails;
//Validate user function
const validateAdminPasswordUpdateInput = async function (req, res, next) {
    try {
        // Validate input details
        const data = req.body;
        const valid = await adminPasswordUpdateSchema
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
exports.validateAdminPasswordUpdateInput = validateAdminPasswordUpdateInput;
//Vaidate Stack input
const stackSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    imageUrl: joi_1.default.string().required()
});
//Validate Stack input function
const validateStackInput = async function (req, res, next) {
    try {
        let datainput = req.body;
        const valid = await stackSchema.validateAsync({ ...datainput });
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
exports.validateStackInput = validateStackInput;
const decadevScore = joi_1.default.object({
    algorithm: joi_1.default.number().min(0).max(100).required(),
    agileTest: joi_1.default.number().min(0).max(100).required(),
    weeklyTask: joi_1.default.number().min(0).max(100).required(),
    assessment: joi_1.default.number().min(0).max(100).required(),
    cummulative: joi_1.default.number().min(0).max(100)
});
const validateScoreInput = async function (req, res, next) {
    try {
        const valid = await decadevScore.validateAsync({ ...req.body });
        if (valid)
            next();
    }
    catch (error) {
        // Send Error to handler
        if (error instanceof joi_1.ValidationError) {
            const { message } = error.details[0];
            next(new Error(message));
        }
    }
};
exports.validateScoreInput = validateScoreInput;
