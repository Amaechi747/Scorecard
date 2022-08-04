import mongoose, {Schema} from "mongoose";
const stackModelSchema = new Schema({
    name: { type: String, required: true},
    imageUrl: {type: String, required: true}
})
const Stack = mongoose.model('Stack', stackModelSchema);
export default Stack;