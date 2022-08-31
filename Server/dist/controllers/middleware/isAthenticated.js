"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isUser_service_1 = __importDefault(require("../../services/isUser.service"));
const isAthenticated = async function (req, res, next) {
    let token;
    if (((req.headers.authorization !== undefined) && (req.headers.authorization.startsWith('Bearer')))) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Verify Token
            if (process.env.JWT_SECRET) {
                const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                if (verified && verified instanceof Object) {
                    const { email } = verified.id;
                    const user = await (0, isUser_service_1.default)(email);
                    req.body.user = user;
                    next();
                }
            }
        }
        catch (error) {
            next(new Error(`${error}`));
        }
    }
    if (!token) {
        // res.status(401).send(false);
        next(new Error('Not authorized, no token'));
    }
};
exports.isAthenticated = isAthenticated;
