"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDecadevSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const stackSchema_1 = __importDefault(require("./stackSchema"));
const scoresSchema_1 = require("./scoresSchema");
const debug = require('debug')('live-project-scorecard-sq011a:server');
// Stack placeholder
const id = Object("62ec43d22d8d489ca5f6c9dd");
exports.createDecadevSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: true
    },
    stack: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: stackSchema_1.default,
        default: id
    },
    phoneNo: { type: Number, default: 1234 },
    squad: { type: String, required: true },
    password: { type: String, required: true },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    }
}, {
    timestamps: true
});
exports.createDecadevSchema.post('save', function (doc) {
    const decadevScore = new scoresSchema_1.Scores({ user_id: doc?._id });
    decadevScore.save();
    return;
});
exports.createDecadevSchema.post('findOneAndDelete', async function (doc) {
    const score = await scoresSchema_1.Scores.findOneAndDelete({ user_id: doc?._id });
    return;
});
const Decadev = mongoose_1.default.model('Decadev', exports.createDecadevSchema);
exports.default = Decadev;
