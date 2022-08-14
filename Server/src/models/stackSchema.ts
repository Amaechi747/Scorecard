import mongoose, {Schema} from "mongoose";
const stackModelSchema = new Schema({
    name: { type: String, required: true},
    imageUrl: {type: String, required: true}
})


export const Stack = mongoose.model('Stack', stackModelSchema);
export default Stack;