"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminSchema_1 = __importDefault(require("../models/adminSchema"));
const decadevSchema_1 = __importDefault(require("../models/decadevSchema"));
const isUser = async function (email) {
    console.log(email);
    const emailSubstring = email.split('@')[1];
    //Admin verification
    if (emailSubstring === "decagonhq.com") {
        const filter = { email };
        const isAdmin = await adminSchema_1.default.findOne(filter);
        if (isAdmin) {
            //Get details
            return isAdmin;
        }
        throw new Error('Invalid User');
    }
    if (emailSubstring === "decagon.dev") {
        const filter = { email: email };
        const isDecadev = await decadevSchema_1.default.findOne(filter);
        if (isDecadev) {
            //Get details
            return isDecadev;
        }
        throw new Error('Invalid User');
    }
};
exports.default = isUser;
