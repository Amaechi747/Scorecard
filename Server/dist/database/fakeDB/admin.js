"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyAdmin = exports.fakeAdmin = exports.adminFakePasswordUpdate = exports.dropCollections = exports.dbDisconnect = exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const adminSchema_1 = __importDefault(require("../../models/adminSchema"));
let mongoServer = null;
const dbConnect = async () => {
    const mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = await mongoServer.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    await mongoose_1.default.connect(uri, mongooseOpts);
};
exports.dbConnect = dbConnect;
const dbDisconnect = async () => {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.connection.close();
    if (mongoServer) {
        mongoServer.stop();
    }
};
exports.dbDisconnect = dbDisconnect;
const dropCollections = async function () {
    if (mongoServer) {
        const collections = await mongoose_1.default.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteOne({});
        }
    }
};
exports.dropCollections = dropCollections;
const id = Object("62ec43d22d8d489ca5f6c9dd");
exports.adminFakePasswordUpdate = {
    // password: "1234",
    newPassword: '0000',
    confirmPassword: '0000'
};
// export const fakeAdmin = async () => {
//     // Stack placeholder
//     const doc = await Stack.findOne({}, { _id: 1 });
//     return new Admin({
//         firstName: "Moses",
//         lastName: "Ikenna",
//         email: "moses.amaechi@decagon.dev",
//         password: "1234",
//         role: "SL",
//         stack: doc?._id,
//         phoneNo: 1234,
//         imageUrl: "#",
//         squad: [12],
//         status: "inactive"
//     })
// }
const fakeAdmin = async () => {
    return new adminSchema_1.default({
        firstName: "Moses",
        lastName: "Ikenna",
        email: "benjamin.effiong@decagon.dev",
        password: 1234,
        role: "SL",
        stack: id,
        phoneNo: 1234,
        imageUrl: "#",
        squad: [12],
        status: "inactive"
    });
};
exports.fakeAdmin = fakeAdmin;
// export const dummyAdmin = new Admin({
//     firstName: "Moses",
//     lastName: "Ikenna",
//     email: "moses.amaechi200@decagon.dev",
//     password: 1234,
//     confirmPassword: 1234,
//     role: "SL",
//     phoneNo: 1234,
//     squad: 12,
//     status: "inactive"
// })
exports.dummyAdmin = {
    firstName: "Benjamin",
    lastName: "Effiong",
    email: "benjamin.effiong@decagon.dev",
    password: "1234",
    confirmPassword: "1234",
    role: "SL",
    phoneNo: 1234,
    squad: 12,
    status: "inactive"
};
// //Create fake model
// const userFakeSchema = new Schema({
//     firstName: {type: String, required: true},
//     lastName: {type: String, required: true},
//     email: {type: String, unique: true, required: true},
//     password: {type: String, required: true},
//     role: {
//         type: String, 
//         enum: ["SuperAdmin", "SL", "PA", "Other"],
//         required: true },
//     stack: {
//         type: Schema.Types.ObjectId,
//         ref: Stack,
//         default: id},
//     phoneNo: {type: Number, default: 1234},
//     imageUrl: {type: String, default: "#"},
//     squad: {
//         type: [Number], 
//         default: [0]},
//     status: {
//         type: String, 
//         enum: ["active", "inactive"],
//         default: "inactive",
//     }
// },
// {
// timestamps: true
// }
// )
// const FakeUser = model('FakeUser', userFakeSchema)
