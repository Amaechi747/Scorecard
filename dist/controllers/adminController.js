"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminPassword = exports.searchScores = exports.filterScores = exports.deleteAdmin = exports.deactivateAdmin = exports.getAdmin = exports.verifyAdmin = exports.activateAdmin = exports.editAdmin = exports.createAdmin = exports.addNewImage = exports.getAdminProfile = void 0;
const adminCRUD_1 = __importDefault(require("../utils/adminCRUD"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const filterScores_1 = __importDefault(require("../utils/filterScores"));
const searchScoresByDecadevsName_1 = __importDefault(require("../utils/searchScoresByDecadevsName"));
const debug = require("debug")("live-project-scorecard-sq011a:server");
exports.getAdminProfile = (0, express_async_handler_1.default)(async function (req, res) {
    // Expecting admins ID from req.params
    const adminId = req.params.id;
    const admin = await adminCRUD_1.default.getAdmin(adminId);
    if (admin) {
        res.status(200).json(admin);
    }
});
exports.addNewImage = (0, express_async_handler_1.default)(async function (req, res) {
    if (req.file) {
        const adminId = req.params.id;
        // console.log('Path: ',req.file.path, '\n');
        const newImageUrl = await adminCRUD_1.default.updateAdminImage(adminId, req.file.path);
        if (newImageUrl) {
            res.status(200).send({ status: 'success', imageUrl: newImageUrl });
            return;
        }
    }
});
exports.createAdmin = (0, express_async_handler_1.default)(async function (req, res, next) {
    // Create admin
    const data = req.body;
    const admin = await adminCRUD_1.default.create(data);
    if (admin) {
        res.status(201).send(admin);
        return;
    }
});
exports.editAdmin = (0, express_async_handler_1.default)(async function (req, res, next) {
    const { id } = req.params;
    console.log('I am here oo', id);
    const update = req.body;
    console.log('Update', update);
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
        // res.status(200).send(activated);
        res.status(200).send({ status: 'success', message: "An activation email has been sent to the admin" });
        return;
    }
});
exports.verifyAdmin = (0, express_async_handler_1.default)(async function (req, res, next) {
    // Get token
    const { token } = req.query;
    const verified = await adminCRUD_1.default.verify(token);
    if (verified) {
        res.status(200).send(verified);
        return;
    }
});
exports.getAdmin = (0, express_async_handler_1.default)(async function (req, res, next) {
    //    Get users
    const getAllAdmins = await adminCRUD_1.default.get();
    if (getAllAdmins) {
        res.status(200).send(getAllAdmins);
    }
});
exports.deactivateAdmin = (0, express_async_handler_1.default)(async function (req, res, next) {
    //Get admin Id
    const { id } = req.params;
    const deactivated = await adminCRUD_1.default.deactivate(id);
    if (deactivated) {
        res.status(201).send({ status: 'success', message: 'Admin deactivated' });
        return;
    }
});
exports.deleteAdmin = (0, express_async_handler_1.default)(async function (req, res, next) {
    // Get admin Id
    const { id } = req.params;
    const deleted = await adminCRUD_1.default.delete(id);
    if (deleted) {
        res.status(200).send({ status: 'success', message: "Admin deleted successfully" });
        return;
    }
});
exports.filterScores = (0, express_async_handler_1.default)(async function (req, res) {
    const { id } = req.params;
    const { week } = req.query;
    const admin = await adminCRUD_1.default.getAdmin(id);
    const { name } = admin?.stack ?? { name: false };
    if (!name)
        throw new Error("Admin has not been assigned a stack");
    if (admin) {
        if (week) {
            try {
                const scores = await (0, filterScores_1.default)(name, +week);
                res.status(200).send(scores);
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        }
        else {
            throw new Error("No week specified");
        }
        return;
    }
    throw new Error("No admin found");
});
exports.searchScores = (0, express_async_handler_1.default)(async function (req, res) {
    const { id } = req.params;
    const { searchText } = req.query;
    const admin = await adminCRUD_1.default.getAdmin(id);
    const { name } = admin.stack;
    if (admin && name) {
        if (searchText) {
            const scores = await (0, searchScoresByDecadevsName_1.default)(name, searchText);
            res.status(200).send(scores);
        }
        else {
            throw new Error("No search text found");
        }
    }
});
exports.updateAdminPassword = (0, express_async_handler_1.default)(async function (req, res) {
    const { 
    // password: oldPass, 
    newPassword: newPass } = req.body;
    const result = await adminCRUD_1.default.changeAdminPassword(req.params.id, newPass);
    if (result) {
        res.send({ status: 'success', message: 'Password has been updated' });
        return;
    }
    throw new Error("No admin found");
});
