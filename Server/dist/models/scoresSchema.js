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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scores = exports.weeklyScoreSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const debug = require('debug')('live-project-scorecard-sq011a:server');
// const calculate = function (v: number) {
//     return (v === undefined) ? (this?.algorithm * 0.2) + (this?.agileTest * 0.2) + (this?.weeklyTask * 0.4) + (this?.assessment * 0.2) : v
// }
exports.weeklyScoreSchema = new mongoose_1.Schema({
    algorithm: {
        type: Number,
        required: [true, "Algorithm score is required"]
    },
    agileTest: {
        type: Number,
        required: [true, "Agile test score is required"]
    },
    weeklyTask: {
        type: Number,
        required: [true, "Weekly task score is required"]
    },
    assessment: {
        type: Number,
        required: [true, "Assessment score is required"]
    },
    cummulative: {
        type: Number,
        // default: calculate,
        set: (v) => Math.round(v)
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});
const scoreSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Decadev',
        required: [true, "Scores cannot be added without a User"]
    },
    scoresWeekly: [exports.weeklyScoreSchema]
});
exports.Scores = mongoose_1.default.model('Score', scoreSchema);
// export default Scores; 
