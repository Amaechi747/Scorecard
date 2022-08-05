import mongoose, {Schema} from "mongoose";
import Stack from './stackSchema'

interface IObjectId extends mongoose.Document{
    id: Schema.Types.ObjectId
}
const id: IObjectId = Object("62ec43d22d8d489ca5f6c9dd");
const adminModelSchema = new Schema({
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
        ref: Stack,
        default: id},
    phoneNo: {type: Number, default: 1234},
    imageUrl: {type: String, default: "#"}
},
{
timestamps: true
})


const Admin = mongoose.model('Admin', adminModelSchema);

export default Admin;