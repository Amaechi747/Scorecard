import mongoose, {Schema} from "mongoose";
import Stack from "./stackSchema";
import { Scores } from "./scoresSchema";
const debug = require('debug')('live-project-scorecard-sq011a:server');

interface IObjectId extends mongoose.Document{
    id: Schema.Types.ObjectId
}
// Stack placeholder
const id: IObjectId = Object("62ec43d22d8d489ca5f6c9dd");

export const createDecadevSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {
        type: String, 
        unique: true, 
        required: true
    },
    stack: {
        type: Schema.Types.ObjectId,
        ref: Stack,
        default: id
    },
    phoneNo: {type: Number, default: 1234},
    squad: {type: String, required: true},
    password: {type: String, required: true},
    status: {
        type: String, 
        enum: ["active", "inactive"],
        default: "inactive",
    }
},
{
    timestamps: true
});

createDecadevSchema.post('save', function(doc) {
    const decadevScore = new Scores({ user_id: doc?._id })
    decadevScore.save();
    return;
})

createDecadevSchema.post('findOneAndDelete', async function(doc){
    const score = await Scores.findOneAndDelete({ user_id: doc?._id });
    return;
})
const Decadev = mongoose.model('Decadev', createDecadevSchema);
export default Decadev;