"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const addImageHandler = (0, express_async_handler_1.default)(async function (req, res, next) {
    try {
        delete req.body.user;
        if (req.file) {
            console.log('For File: ', req.file);
            req.body.imageUrl = req.file.path;
            next();
        }
    }
    catch (error) {
        next(new Error(`${error}`));
    }
});
exports.default = addImageHandler;
