"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scoresSchema_1 = require("../models/scoresSchema");
const getWeeklyScores = async (stack_name, week) => {
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
                "stack.name": `${stack_name}`,
            },
        },
        {
            $project: {
                currentWeekScore: {
                    $arrayElemAt: ["$scoresWeekly", (week - 1)],
                },
                user: 1,
            },
        },
    ]);
};
// {
//   $lookup: {
//     from: "decadevs",
//     localField: "user_id",
//     foreignField: "_id",
//     as: "user",
//   },
// },
// {
//   $unwind: {
//     path: "$user",
//   },
// },
// {
//   $lookup: {
//     from: "stacks",
//     localField: "user.stack",
//     foreignField: "_id",
//     as: "stack",
//   },
// },
// {
//   $unwind: {
//     path: "$stack",
//   },
// },
// {
//   $project: {
//     currentWeekScore: {
//       $slice: ["$scoresWeekly", 0, 1],
//     },
//     user: 1,
//     // _id: 0,
//   },
// },
// {
//   $unwind: {
//     path: "$currentWeekScore",
//   },
// },
exports.default = getWeeklyScores;
