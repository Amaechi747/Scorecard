"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeUser = exports.dropCollections = exports.dbDisconnect = exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const decadevSchema_1 = __importDefault(require("../../models/decadevSchema"));
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
// Stack placeholder
const id = Object("62ec43d22d8d489ca5f6c9dd");
const fakeUser = async () => {
    return new decadevSchema_1.default({
        firstName: "James",
        lastName: "Jay",
        email: "jamesjay2@gmail.com",
        password: 1234,
        stack: id,
        phoneNo: 1234,
        squad: "12",
        status: "inactive"
    });
};
exports.fakeUser = fakeUser;
// export const dummyUser = {
//     firstName: 'John',
//     lastName: 'paul',
//     email: 'john@gmail.com',
//     password: 1234,
//     phoneNo: 09045454567,
//     squad: '11',
//     status: 'inactive'
// }
