"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scoresSchema_1 = require("../models/scoresSchema");
const searchScoresByDecadevsName = (adminStackName, searchText) => {
    return scoresSchema_1.Scores.aggregate([
        {
            $lookup: {
                from: "decadevs",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $unwind: {
                path: "$user",
            },
        },
        {
            $lookup: {
                from: "stacks",
                localField: "user.stack",
                foreignField: "_id",
                as: "stack",
            },
        },
        {
            $unwind: {
                path: "$stack",
            },
        },
        {
            $match: {
                "stack.name": `${adminStackName}`,
            },
        },
        {
            $project: {
                scoresWeekly: 1,
                fullName: { $concat: ["$user.firstName", " ", "$user.lastName"] },
                "user.firstName": 1,
                "user.lastName": 1,
            },
        },
        {
            $match: {
                fullName: new RegExp(`.*${searchText}.*`, 'gi'),
            },
        },
    ]);
};
exports.default = searchScoresByDecadevsName;
