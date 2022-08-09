import mongoose,{Error} from 'mongoose';
import {describe, expect, test, it, beforeAll, afterAll, afterEach} from '@jest/globals'
import supertest from 'supertest';
import {fakeAdmin, dbConnect, dbDisconnect, dropCollections} from '../database/fakeDB/admin';
import Admin from '../models/adminSchema';
import { debug } from 'console';



// Database Connections
beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());
afterEach( async () => await dropCollections)

describe('Create Admin Models', ()=>{
    it('Should create an new Admin', async () => {
        await fakeAdmin.save();
        expect(fakeAdmin._id).toBeDefined();
        expect(fakeAdmin.email).toBeDefined();
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


