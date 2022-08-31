"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewAllStackById = exports.deleteStack = exports.editStack = exports.addStack = exports.viewAllStack = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminCRUD_1 = __importDefault(require("../utils/adminCRUD"));
//STACK CONTROLLER FUNCTION
/* View All Stack */
exports.viewAllStack = (0, express_async_handler_1.default)(async function (req, res, next) {
    if (req.query.stackId && req.body.user.role !== "SuperAdmin") {
        const { stackId } = req.query;
        const userId = req.body.user._id;
        const getStack = await adminCRUD_1.default.getStackById(userId, stackId);
        if (getStack) {
            res.status(200).send({ status: "Success" });
            return;
        }
        res.status(401).send({ status: "failed", message: "You are not authorized to visit this route" });
        return;
    }
    const stacks = await adminCRUD_1.default.viewAllStack();
    if (stacks) {
        res.status(200).send({ status: 'success', message: 'Stack retrieved successfully', data: stacks });
        return;
    }
});
/* Create Stack Contoller */
exports.addStack = (0, express_async_handler_1.default)(async function (req, res, next) {
    let data = req.body;
    const stack = await adminCRUD_1.default.addStack(data);
    if (stack) {
        res.status(201).send({ status: 'success', message: 'Stack created successfully', data: stack });
        return;
    }
});
/* Edit Stack */
exports.editStack = (0, express_async_handler_1.default)(async function (req, res, next) {
    const { id } = req.params;
    const update = req.body;
    const stackToEdit = await adminCRUD_1.default.editStack(id, update);
    if (stackToEdit) {
        res.status(201).send({ status: 'success', message: 'Stack updated successfully', data: stackToEdit });
        return;
    }
});
/* Delete Stack */
exports.deleteStack = (0, express_async_handler_1.default)(async function (req, res, next) {
    const { id } = req.params;
    const stackToDelete = await adminCRUD_1.default.deleteStack(id);
    if (stackToDelete) {
        res.status(201).send({ status: 'success', message: 'Stack deleted successfully', data: stackToDelete });
        return;
    }
});
exports.viewAllStackById = (0, express_async_handler_1.default)(async function (req, res, next) {
    console.log(req.query);
    // const {userId, stackId} = req.query;
    // if(userId && stackId){
    //     const getStack = await ADMIN.getStackById(userId, stackId);
    //     if(getStack){
    //         res.status(201).send({status: "Success", message: "You have done it"});
    //         return;
    //     }
    // }
});
