import mongoose,{Error} from 'mongoose';
import {describe, expect, test, it, beforeAll, afterAll, afterEach, beforeEach} from '@jest/globals'
import request, { Test } from 'supertest';
import app from '../app';
import {fakeAdmin, dbConnect, dbDisconnect, dropCollections} from '../database/fakeDB/admin';
import Admin from '../models/adminSchema';
import { adminFakePasswordUpdate } from '../database/fakeDB/admin';



// Database Connections
beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());
afterEach( async () => await dropCollections)

let fakePerson: any;
describe('Create Admin Models', ()=>{
    it('Should create an new Admin', async () => {
        fakePerson = await fakeAdmin();
        await fakePerson.save()
        expect(fakePerson?._id).toBeDefined();
        expect(fakePerson?.email).toBeDefined();
    })

    it('Should fail without the required fields', async () => {
        const fake = {
            lastName: "Amaechi",
            firstName: "Moses",
            password: 1234,
        }
        const newAdmin = new Admin({...fake});
        try {
            await newAdmin.save();
        } catch (error: any) {
            const { name } = error;
            expect(name).toEqual('ValidationError');
        }
    })

})


describe('Tests by Leslie', function (){
    
    it('Should return the admin\'s profile', async function (){
        const {password, stack, ...result} = JSON.parse(JSON.stringify(fakePerson));
        const response: any = await request(app)
            .get(`/admin/profile/${fakePerson?._id}`)

        expect(response.status).toBe(200);
        const assertResponse = JSON.parse(response.text);
        expect(assertResponse).toEqual(expect.objectContaining(result));
        expect(assertResponse.stack).toBeNull();
    })

    it('Should change admin\'s password', async function(){
        const response: any = await request(app)
            .put(`/admin/update_password/${fakePerson?._id}`)
            .send(adminFakePasswordUpdate());
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text)).toEqual(expect.objectContaining({status: 'Success'}));

    })

    it('Should upload an image to admin\'s profile', async () => {
        const response: any = await request(app)
            .put(`/admin/upload/${fakePerson?._id}`)
            .attach('image', `${__dirname}/fixtures/websiteplanet-dummy-150X150.png`)
        expect(response.status).toBe(200);
        expect(response.text).toMatch(/^https:\/\/res.cloudinary.com/);
    })
})


