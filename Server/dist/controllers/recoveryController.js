"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const recoveryService_1 = __importDefault(require("../services/recoveryService"));
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('live-project-scorecard-sq011a:server');
exports.forgotPassword = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email } = req.body;
    const userExists = email ? await recoveryService_1.default.userExists({ ...req.body }) : null;
    if (userExists) {
        if (userExists.status === 'inactive')
            throw new Error('Account is not activated');
        const decadev = await recoveryService_1.default.sendPasswordResetLink(userExists);
        if (decadev) {
            res.status(200).send({ status: 'success', message: 'Password resent link has been sent to your email and would expire in 24hrs' });
            return;
        }
    }
    else {
        throw new Error(`No user exists with email ${req.body?.email}`);
    }
});
exports.resetPassword = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id, newPassword: password } = req.body;
    const updatedUser = await recoveryService_1.default.resetPassword(id, password);
    if (updatedUser) {
        res.status(200).send({ status: 'success', message: 'Password reset successful' });
        return;
    }
});
