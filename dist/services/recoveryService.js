"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mailer_service_1 = require("./mailer.service");
const decadevSchema_1 = __importDefault(require("../models/decadevSchema"));
const adminSchema_1 = __importDefault(require("../models/adminSchema"));
const emailTemplate_1 = __importDefault(require("../utils/emailTemplate"));
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('live-project-scorecard-sq011a:server');
async function sendPasswordResetLink(user) {
    try {
        if (user) {
            let { email, firstName, lastName, _id } = user;
            const token = jsonwebtoken_1.default.sign({ id: _id }, `${process.env.JWT_SECRET}`, { expiresIn: '5m' });
            const url = `${process.env.CLIENT_URL}/reset-password/${token}`;
            //Send email to user
            const subject = `Scorecard password Reset`;
            const text = `<p>Click to reset your password on Scorecard <a href="http://${url}"> click here</a>.</p>`;
            const mail = (0, emailTemplate_1.default)(firstName, text);
            await (0, mailer_service_1.emailService)(email, subject, mail, `${firstName} ${lastName}`);
            return user;
        }
    }
    catch (error) {
        throw new Error(`${error}`);
    }
}
async function resetPassword(id, password) {
    let user = await decadevSchema_1.default.findById(id);
    if (!user) {
        user = await adminSchema_1.default.findById(id);
    }
    if (user) {
        if (user?.status === 'active') {
            // Hash Password
            const salt = await bcryptjs_1.default.genSalt(10);
            const hashedPassword = await bcryptjs_1.default.hash(password, salt);
            user.password = hashedPassword;
            return await user.save();
        }
        else {
            throw new Error('Account not activated cannot reset password');
        }
    }
    throw new Error('Invalid User');
}
async function userExists(query) {
    let user = await decadevSchema_1.default.findOne(query);
    if (user) {
        return user.toObject();
    }
    else {
        user = await adminSchema_1.default.findOne(query);
        if (user) {
            return user.toObject();
        }
    }
    debug('User: ', user);
    return null;
}
exports.default = {
    sendPasswordResetLink,
    userExists,
    resetPassword
};
