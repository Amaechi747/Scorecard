"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCummulativePerformance = exports.performanceTracker = exports.getCurrentPerformance = exports.updatePassword = exports.addScoreForDecadev = exports.deactivateDecadev = exports.verifyDecadev = exports.activateDecadev = exports.getDecadev = exports.deleteDecadev = exports.editDecadev = exports.createDecadev = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const decadevCRUD_1 = require("../utils/decadevCRUD");
//Controller for Admin to create an Account for decadevs
exports.createDecadev = (0, express_async_handler_1.default)(async (req, res, next) => {
    // Create decadev
    const data = req.body;
    const decadev = await decadevCRUD_1.DECADEV.create(data);
    if (decadev) {
        res.status(200).send({ status: 'success', message: "Decadev account created successfully", data: decadev });
        return;
    }
});
//Controller for Admin to update the details of a decadev
exports.editDecadev = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    console.log("123344555555555", req.body);
    const update = req.body;
    //Update details
    const updatedDecadevData = await decadevCRUD_1.DECADEV.edit(id, update);
    //Send updated data
    console.log('Updated Decadev Data: \n', updatedDecadevData);
    if (updatedDecadevData) {
        res.status(201).send({ status: 'success', message: "Update saved" });
        return;
    }
});
//Controller for Admin to delete a Decadev's account
exports.deleteDecadev = (0, express_async_handler_1.default)(async (req, res, next) => {
    // Get Decadev Id
    const { id } = req.params;
    const deleted = await decadevCRUD_1.DECADEV.delete(id);
    if (deleted) {
        res.status(200).send({ status: 'success', message: "Decadev account deleted successfully" });
        return;
    }
    return;
});
//Get all decadev
exports.getDecadev = (0, express_async_handler_1.default)(async function (req, res, next) {
    //    Get users
    const getAllDecadev = await decadevCRUD_1.DECADEV.get();
    if (getAllDecadev) {
        res.status(200).send(getAllDecadev);
    }
});
exports.activateDecadev = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const activated = await decadevCRUD_1.DECADEV.activate(id);
    if (activated) {
        res.status(200).send({ status: 'success', message: "Decadev account activated" });
        return;
    }
});
exports.verifyDecadev = (0, express_async_handler_1.default)(async (req, res, next) => {
    //Get token
    const { token } = req.query;
    const verified = await decadevCRUD_1.DECADEV.verify(token);
    if (verified) {
        res.status(200).send({ status: 'success', message: "Account verified successfully" });
        return;
    }
});
exports.deactivateDecadev = (0, express_async_handler_1.default)(async (req, res, next) => {
    //Get Decadev Id
    const { id } = req.params;
    const deactivated = await decadevCRUD_1.DECADEV.deactivate(id);
    if (deactivated) {
        res.status(201).send({ status: 'success', message: "Decadev account deactivated" });
        return;
    }
});
exports.addScoreForDecadev = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const addedScore = await decadevCRUD_1.DECADEV.addScore(id, req.body);
    if (addedScore) {
        res.status(200).send(addedScore);
        return;
    }
});
exports.updatePassword = (0, express_async_handler_1.default)(async function (req, res, next) {
    const data = { ...req.body };
    const { password } = data;
    const passwordIsUpdated = await decadevCRUD_1.DECADEV.updatePassword(req.body.user, password);
    res.status(200).send({ status: "Success", message: "Password Updated Successfully" });
    return;
});
exports.getCurrentPerformance = (0, express_async_handler_1.default)(async function (req, res, next) {
    const { id } = req.params;
    const currentPerformance = await decadevCRUD_1.DECADEV.getCurrentPerformance(id);
    res.status(200).send({
        message: "Success",
        data: currentPerformance
    });
    return;
});
exports.performanceTracker = (0, express_async_handler_1.default)(async function (req, res, next) {
    const { id } = req.params;
    const performance = await decadevCRUD_1.DECADEV.performanceTracker(id);
    res.status(200).send({
        message: "Success",
        data: performance
    });
    return;
});
exports.getCummulativePerformance = (0, express_async_handler_1.default)(async function (req, res, next) {
    const { id } = req.params;
    const currentPerformance = await decadevCRUD_1.DECADEV.cummulativePerformance(id);
    res.status(200).send({
        message: "Success",
        data: currentPerformance
    });
    return;
});
