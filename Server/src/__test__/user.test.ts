import request from 'supertest';
import {fakeUser, dbConnect, dbDisconnect, dropCollections} from '../database/fakeDB/user';
import Decadev from '../models/decadevSchema';
import { beforeAll, afterAll, afterEach, beforeEach, describe, it, test, expect} from '@jest/globals';
import { app } from '../app';



// Database Connections
beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());
// afterEach( async () => await dropCollections)

describe('Create Decadev Models', ()=>{
    it('Should create a new Decadev', async () => {
        const fakeDecadev = await fakeUser();
        await fakeDecadev.save();
        expect(fakeDecadev._id).toBeDefined();
        expect(fakeDecadev.email).toBeDefined();
    })

    it('Should fail without the required fields', async () => {
        try{
            const fake = {
                lastName: "James",
                firstName: "Jay",
                password: 1234,
            }
            const newUser = new Decadev({...fake});
            await newUser.save();
        } catch(error){
            expect(error).toBeDefined();
        }
    })

    it('should update a field', async () => {
        try{
            const update = {
                firstName: 'James',
                lastName: 'Jay',
                password: 1234,
            }

            const filter = {_id: "62efd2682f9b9b101d765f59"};
            //update
            const updatedDecadev = Decadev.findOneAndUpdate(filter, update, {new: true});
            expect(updatedDecadev).toBeDefined();
        } catch(error){
            expect(error).toBeNull();
        }
    })

    it('should activate decadev', async () => {
        try{
            const update = {
                status: 'active',
            }

            const filter = {_id: "62efd2682f9b9b101d765f59"};
            //update
            const updatedDecadev = await Decadev.findOneAndUpdate(filter, update, {new: true});
            expect(updatedDecadev).toBeDefined();
        } catch(error){
            expect(error).toBeNull();
        }
    })

    it('should deactivate decadev', async () => {
        try{
            const update = {
                status: 'inactive',
            }

            const filter = {_id: "62efd2682f9b9b101d765f59"};
            //update
            const updatedDecadev = await Decadev.findOneAndUpdate(filter, update, {new: true});
            expect(updatedDecadev).toBeDefined();
        } catch(error){
            expect(error).toBeNull();
        }
    })

    it('should delete decadev', async () => {
        try{
            const filter = {_id: "62efd2682f9b9b101d765f59"};

            //delete decadev
            const deleteDecadev = await Decadev.findOneAndDelete(filter);
            expect(deleteDecadev).toBeDefined();
        } catch(error){
            expect(error).toBeDefined();
        }
    })
})


describe('Decadev endpoints', () => {
    let id: any;
    beforeEach(async () => {
        const fakeDecadev = await fakeUser();
        await fakeDecadev.save();

        const decadev = await Decadev.findOne();
        id = decadev?._id;
    })

    afterEach( async () => {
        return await Decadev.findOneAndDelete({id});
    })

    it('should return 200 for create decadev endpoints', async () => {
        try {
            const res = await request(app).post('/admin/create_decadev').send({
                firstName: "James",
                lastName: "Jay",
                email: "jamesjay3@gmail.com",
                password: 1234,
                phoneNo: 1234,
                squad: "12",
                status: "inactive"
            })
            expect(res.status).toBe(200);
        } catch (error) {
            const { name, code }: any = error;
            console.log('Error name: ', name, '\nCode: ', code);
            // expect(error).toBeDefined()
        }
    })

    it('should pass the update decadev end point', async () => {
        const res = await request(app).patch(`/admin/edit_decadev/${id}`)
        expect(res.status).toBe(201);
    })

    it('should pass the delete decadev end point', async () => {
        const res = await request(app).delete(`/admin/delete_decadev/${id}`)
        expect(res.status).toBe(200);
    })

    it('should pass the activate decadev end point', async () => {
        const res = await request(app).post(`/admin/activate_decadev/${id}`)
        expect(res.status).toBe(200);
    })

    it('should pass the deactivate decadev end point', async () => {
        const res = await request(app).patch(`/admin/deactivate_decadev/${id}`)
        expect(res.status).toBe(201);
    })
})











// function beforeEach(arg0: () => Promise<void>) {
//     throw new Error('Function not implemented.');
// }
// import mongoose from 'mongoose';
// import supertest from 'supertest';
// //import server from '././bin/wwww'

// //const app = createApp()

// if(process.env.NODE_ENV === 'test'){
//     mongoose.connection.close(function (){
//     })
// }
// afterAll(()=> mongoose.disconnect());

// const userId = new mongoose.Types.ObjectId().toString();

// const userPayload = {
//     //_id: userId,
//     firstName: 'James',
//     lastName: 'Obi',
//     email: 'moses@gmail.com',
//     password: 'password1'
// };

// const userInput = {
//     firstName: 'James',
//     lastName: 'Obi',
//     email: 'moses@gmail.com',
//     password: 'password1'
// };

// describe('user', () => {
//     //decadev registration

//     describe('user registration', () => {
//         describe('given the email and password are valid', () => {
//             it('should return the user info', async() => {
//                 const createUserServiceMock = jest
//                 .spyOn(UserService, 'createDecadev')
//                 // @ts-ignore
//                 .mockReturnValueOnce(userPayload);
                
//                 const {statusCode, body} = await supertest(app).post('/create_decadev').send(userInput);
//                 expect(statusCode).toBe(200);
//                 expect(body).toBe(userPayload);

//                 expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
//             })
//         })

//         describe('given the passwords do not match', () => {
//             it('should return a 400', () => {

//             })
//         })

//         describe('given the user service throws', () => {
//             it('should handle a 404 error', () => {

//             })
//         })
//     })

//     // creating a user session
//     describe('create user session',() => {
//         describe('given the email and password are valid', () => {
//             it('should return a signed token', () => {

//             })
//         })
//     })
// })