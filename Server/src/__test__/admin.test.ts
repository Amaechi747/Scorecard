import mongoose,{Error} from 'mongoose';
import request from 'supertest';
import app from '../app';
import {fakeAdmin, dummyAdmin, dbConnect, dbDisconnect, dropCollections} from '../database/fakeDB/admin';
import Admin from '../models/adminSchema';



// Database Connections
beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());
afterEach( async () => await dropCollections)

describe('Create Admin Model Operations', ()=>{
    it('Should create an new Admin', async () => {
        const fakePerson = await fakeAdmin();
        await fakePerson.save();
        expect(fakePerson._id).toBeDefined();
        expect(fakePerson.email).toBeDefined();
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
            expect( error).toBeNull();

        }
    })
  
})

describe('Create Admin Endpoints', () => {
    // let server: any, agent;
    // beforeEach((done) => {
    //     server = app.listen(4000, () => {
    //         agent = request.agent(server);
    //         done();
    //     })
    // })

    // afterEach((done) => {
    //     return server && server.close(done);
    // })
    let id: any;
    beforeEach(async () => {
        const fakePerson = await fakeAdmin();
        await fakePerson.save();

        const admin = await Admin.findOne();
        id = admin?._id;

    })

    afterEach(async () => {
        console.log(id);
        const admin = await Admin.findOneAndDelete({id});
        console.log('deleted');
    })

    // it('It should access the verify admin endpoint', async () => {
    //     const res = await  request(app).get('/admin')
    //     expect (res.status).not.toBe(404);
    // })

    it('It should return 201 for the create admin endpoint', async () => {
        const res = await  request(app).post('/admin/create_user').send({
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

})