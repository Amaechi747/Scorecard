import mongoose, {Schema, model} from "mongoose";
import {MongoMemoryServer} from 'mongodb-memory-server';
import Stack from '../../models/stackSchema'
import Decadev from '../../models/decadevSchema';
let mongoServer: any = null;
  

export const dbConnect = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();
    const mongooseOpts: any = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    await mongoose.connect(uri, mongooseOpts);
}


export const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if(mongoServer){
        mongoServer.stop();
    }
}

export const dropCollections = async function(){
    if(mongoServer){
        const collections = await mongoose.connection.db.collections();
        for(let collection of collections){
            await collection.deleteOne({});
        }
    }
}


interface IObjectId extends mongoose.Document{
    id: Schema.Types.ObjectId
}
// Stack placeholder
const id: IObjectId = Object("62ec43d22d8d489ca5f6c9dd");


export const fakeUser = async () => {
    return new Decadev({
    firstName: "James",
    lastName: "Jay",
    email: "jamesjay2@gmail.com",
    password: 1234,
    stack: id,
    phoneNo: 1234,
    squad: "12",
    status: "inactive"
})
}

// export const dummyUser = {
//     firstName: 'John',
//     lastName: 'paul',
//     email: 'john@gmail.com',
//     password: 1234,
//     phoneNo: 09045454567,
//     squad: '11',
//     status: 'inactive'
// }