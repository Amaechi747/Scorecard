import mongoose, {Schema} from "mongoose";
import Stack from './stackSchema'
const userModelSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {
        type: String, 
        enum: ["SuperAdmin", "SL", "PA", "Other"],
        required: true },
    stack: {
        type: Schema.Types.ObjectId,
        ref: Stack},
    phoneNo: {type: Number},
    imageUrl: {type: String},
    addedBy: {type: String},
},
{
timestamps: true
})
const User = mongoose.model('User', userModelSchema);
export default User;