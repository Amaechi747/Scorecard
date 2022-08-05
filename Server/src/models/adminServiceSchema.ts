import mongoose, {Schema} from "mongoose";

export const createDecadevSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    stack: [String],
    squad: {type: String}
});

export const Decadev = mongoose.model('Decadev', createDecadevSchema)