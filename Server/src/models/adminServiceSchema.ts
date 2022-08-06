import mongoose, {Schema} from "mongoose";
import Stack from "./stackSchema"

interface IObjectId extends mongoose.Document{
    id: Schema.Types.ObjectId
}
// Stack placeholder
const id: IObjectId = Object("62ec43d22d8d489ca5f6c9dd");

export const createDecadevSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, unique: true},
    stack: {
        type: Schema.Types.ObjectId,
        ref: Stack,
        default: id},
    phoneNo: {type: Number, default: 1234},
    squad: {
        type: [Number], 
        default: [0]},
});


export const Decadev = mongoose.model('Decadev', createDecadevSchema);