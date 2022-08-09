import mongoose, { Schema } from "mongoose";
const debug = require('debug')('live-project-scorecard-sq011a:server');


// const calculate = function (v: number) {
//     return (v === undefined) ? (this?.algorithm * 0.2) + (this?.agileTest * 0.2) + (this?.weeklyTask * 0.4) + (this?.assessment * 0.2) : v
// }
export const weeklyScoreSchema = new Schema({
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
        set: (v: number) => Math.round(v)
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
})

const scoreSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Decadev',
        required: [true, "Scores cannot be added without a User"]
    },
    scoresWeekly: [weeklyScoreSchema]
})


export const Scores = mongoose.model('Score', scoreSchema);

// export default Scores; 