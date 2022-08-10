import { Scores } from "../models/scoresSchema";

Scores.aggregate([
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
      localField: "stack",
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
    $project: {
      currentWeekScore: {
        $slice: ["$scoresWeekly", 0, 1],
      },
      user: 1,
      _id: 0,
    },
  },
  {
    $unwind: {
      path: "$currentWeekScore",
    },
  },
]);
