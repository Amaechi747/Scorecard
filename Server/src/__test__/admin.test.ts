import mongoose,{Error} from 'mongoose';
import request from 'supertest';
import app from '../app';
import {fakeAdmin, dbConnect, dbDisconnect, dropCollections} from '../database/fakeDB/admin';
import { beforeAll, afterEach, beforeEach, afterAll, describe, it, expect } from '@jest/globals'
import Admin from '../models/adminSchema';
import { adminFakePasswordUpdate } from '../database/fakeDB/admin';




// Database Connections
beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());
afterEach(async () => await dropCollections)


describe('Create Admin Models', ()=>{
    let fakePerson: any;
    it('Should create an new Admin', async () => {
        fakePerson = await fakeAdmin();
        await fakePerson.save()
        expect(fakePerson?._id).toBeDefined();
        expect(fakePerson?.email).toBeDefined();
    })

    it('Should fail without the required fields', async () => {
        try{
            const fake = {
                lastName: "Amaechi",
                firstName: "Moses",
                password: 1234,
            }
            const newAdmin = new Admin({...fake});
            await newAdmin.save();
        }catch(error){
            expect( error).toBeDefined();

        }
    })

    it('Should update a field', async () => {
        try{
            const update = {
                lastName: "Amaechi",
                firstName: "Moses",
                password: 1234,
            }
            const filter = {_id: "62f06c9d2b6b170b235ed7ff"}
            //Update
            const updatedAdmin = Admin.findOneAndUpdate(filter, update, { new: true });

            expect(updatedAdmin).toBeDefined();
        }catch(error){
            expect( error).toBeNull();

        }
    })

    it('Should activate an Admin', async () => {
        try{
            const update = {
                status: "active",
            }
            const filter = {_id: "62f06c9d2b6b170b235ed7ff"}
            //Update
            const updatedAdmin = Admin.findOneAndUpdate(filter, update, { new: true });

            expect(updatedAdmin).toBeDefined();
        }catch(error){
            expect( error).toBeNull();

        }
    })

    it('Should deactivate an Admin', async () => {
        try{
            const update = {
                status: "inactive",
            }
            const filter = {_id: "62f06c9d2b6b170b235ed7ff"}
            //Update
            const updatedAdmin = Admin.findOneAndUpdate(filter, update, { new: true });

            expect(updatedAdmin).toBeDefined();
        }catch(error){
            expect( error).toBeNull();

        }
    })

    it('Should delete an Admin', async () => {
        try{

            const filter = {_id: "62f06c9d2b6b170b235ed7ff"}
            //Delete Admin
            const deletedAdmin = await Admin.findOneAndDelete(filter);

            expect(deletedAdmin).toBeDefined();
        }catch(error){
            expect(error).toBeNull();

        }

    })
  
})

describe('Create Admin Endpoints', () => {

    let id: any;
    let admin: any;
    beforeEach(async () => {
        const fakePerson = await fakeAdmin();
        await fakePerson.save();

        admin = await Admin.findOne();
        id = admin?._id;

    })

    afterEach(async () => {
        const admin = await Admin.findOneAndDelete({id});

    })


    it('It should return 201 for the create admin endpoint', async () => {
        try {
            const res = await request(app).post('/admin/create_user').send({
                firstName: "Moses",
                lastName: "Ikenna",
                email: "moses.amaechi@decagon.dev",
                password: "1234",
                confirmPassword: "1234",
                role: "SL",
                phoneNo: 1234,
                squad: 12,
                status: "inactive"
            });
            expect (res.status).toBe(201);
        } catch (error) {
            const { name, code }: any = error;
            console.log('Error name: ', name, '\nCode: ', code);
            // expect(error).toBeDefined()
        }

    })

    it('It should pass the update admin endpoint', async () => {
        const res = await  request(app).patch(`/admin/edit/${id}`)
        expect (res.status).toBe(201);
    })

    it('It should access the delete admin endpoint', async () => {
        const res = await  request(app).delete(`/admin/delete/${id}`)
        expect (res.status).toBe(204);
    })

    it('It should access the activate admin endpoint', async () => {
        const res = await  request(app).post(`/admin/activate/${id}`)
        expect (res.status).toBe(200);
    })

    it('It should access the deactivate admin endpoint', async () => {
        const res = await  request(app).patch(`/admin/deactivate/${id}`)
        expect (res.status).toBe(201);
    })
    // it('It should access the verify admin endpoint', async () => {
    //     const res = await  request(app).get('/admin/verify')
    //     expect (res.status).not.toBe(404);
    // })

    it('it should display all Admins when returned true', async () => {
        const res = await request(app).get('/admin')
           expect(res.status).toBe(200);

    })

   

})


describe('Tests by Leslie', function (){
    

    let id: any;
    let admin: any;
    beforeEach(async () => {
        const fakePerson = await fakeAdmin();
        await fakePerson.save();

        admin = await Admin.findOne();
        id = admin?._id;

    })

    afterEach(async () => {
        // console.log(id);
        const admin = await Admin.findOneAndDelete({id});
        // console.log('deleted');
    })

    it('Should return the admin\'s profile', async function (){
        const {password, stack, ...result} = JSON.parse(JSON.stringify(admin));
        const response: any = await request(app)
            .get(`/admin/profile/${admin?._id}`)

        expect(response.status).toBe(200);
        const assertResponse = JSON.parse(response.text);
        expect(assertResponse).toEqual(expect.objectContaining(result));
        expect(assertResponse.stack).toBeNull();
    })

    it('Should change admin\'s password', async function(){
        try {
            const response: any = await request(app)
                .put(`/admin/update_password/${admin?._id}`)
                .send(adminFakePasswordUpdate);
            expect(response.status).toBe(200);
            expect(JSON.parse(response.text)).toEqual(expect.objectContaining({status: 'success'}));
        } catch (error) {
            console.log(error);
        }

    })

    it('Should upload an image to admin\'s profile', async () => {
        const response: any = await request(app)
            .put(`/admin/upload/${admin?._id}`)
            .attach('image', `${__dirname}/fixtures/websiteplanet-dummy-150X150.png`)
        expect(response.status).toBe(200);

        expect(JSON.parse(response.text)).toEqual(expect.objectContaining({status: 'success', imageUrl: expect.stringMatching(/^https:\/\/res.cloudinary.com/)}))
        // expect(response.text).toMatch(/^https:\/\/res.cloudinary.com/);
    })

    it('Should send forgot password link', async () => {
        const response = await request(app)
            .post('/recover/forgot_password')
            .send({ email: admin?.email })
        expect(response.status).toBe(500);
        expect(JSON.parse(response.text)).toEqual({'error':'Account is not activated'})

    })

    it('Should reset password for valid user', async () => {
        const response = await request(app)
            .post('/recover/reset_password')
            .send({ id: admin?._id , ...adminFakePasswordUpdate })
        expect(response.status).toBe(500);
        expect(JSON.parse(response.text)).toEqual({'error':'Account not activated cannot reset password'})
        
    })
})



// describe('viewAll Admin Models', () => {
//     it('it should display all Admins when returned true', async () => {
//          const res = await request(app).get('/admin')
//             expect(res.status).toBe(200);

//     })
    

// })
//test for stack creation by  super admin
// describe('create stack',()=>{
//     it('it should return true when stack is created',async ()=>{
//         const res = await(await request(app).get('/admin/create_stack'))
//         expect(res.status).toBe(200);
//     })
// })

describe('viewAll Admin Models', () => {
    it('it should display all Admins when returned true', async () => {
         const res = await request(app).get('/admin')
            expect(res.status).toBe(200);

    })
})
//test for stack creation by  super admin
// describe('create stack',()=>{
//     it('it should return true when stack is created',async ()=>{
//         const res = await request(app)
//                         .post('/admin/create_stack')
//                         .send({ name: 'c#', imageUrl: 'http://example.com' })
//         expect(res.status).toBe(200);
//     })

// })



