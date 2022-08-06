"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.deactivateAdmin = exports.verifyAdmin = exports.activateAdmin = exports.editAdmin = exports.createAdmin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminCRUD_1 = __importDefault(require("../utils/adminCRUD"));
// const ADMIN_API = {
// }
exports.createAdmin = (0, express_async_handler_1.default)(async function (req, res, next) {
    // Create admin
    const data = req.body;
    const admin = await adminCRUD_1.default.create(data);
    if (admin) {
        console.log('I am here');
        res.status(200).json(admin);
        return;
    }
});
exports.editAdmin = (0, express_async_handler_1.default)(async function (req, res, next) {
    const { id } = req.params;
    console.log('Req', id);
    const update = req.body;
    // Update details
    const updatedAdminData = await adminCRUD_1.default.edit(id, update);
    //Send updated data
    if (updatedAdminData) {
        res.status(201).send(updatedAdminData);
        return;
    }
});
exports.activateAdmin = (0, express_async_handler_1.default)(async function (req, res, next) {
    const { id } = req.params;
    const activated = await adminCRUD_1.default.activate(id);
    if (activated) {
        res.status(200).send(activated);
        return;
    }
});
exports.verifyAdmin = (0, express_async_handler_1.default)(async function (req, res, next) {
    // Get token
    console.log(req.query);
    const { token } = req.query;
    const verified = await adminCRUD_1.default.verify(token);
    if (verified) {
        res.status(200).send(verified);
        return;
    }
});
exports.deactivateAdmin = (0, express_async_handler_1.default)(async function (req, res, next) {
    //Get admin Id
    const { id } = req.params;
    const deactivated = await adminCRUD_1.default.deactivate(id);
    if (deactivated) {
        res.status(201).send(deactivated);
        return;
    }
});
exports.deleteAdmin = (0, express_async_handler_1.default)(async function (req, res, next) {
    // Get admin Id
    const { id } = req.params;
    const deleted = await adminCRUD_1.default.delete(id);
    if (deleted) {
        res.status(201).send(deleted);
        return;
    }
});
