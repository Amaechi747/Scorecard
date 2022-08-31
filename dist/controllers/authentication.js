"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.loginUser = exports.loginSuperAdmin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_service_1 = __importDefault(require("../services/user.service"));
const loginSuperAdmin = async function (req, res, next) {
    const { email, password } = req.body;
};
exports.loginSuperAdmin = loginSuperAdmin;
exports.loginUser = (0, express_async_handler_1.default)(async function (req, res, next) {
    const data = req.body;
    const userToken = await user_service_1.default.verify(data);
    if (userToken) {
        res.status(200).send({ message: "Success", data: userToken });
        return;
    }
    res.status(401).send(false);
    return;
});
exports.logout = (0, express_async_handler_1.default)(async function (req, res, next) {
    const data = req.body;
    const userToken = await user_service_1.default.logout();
});
