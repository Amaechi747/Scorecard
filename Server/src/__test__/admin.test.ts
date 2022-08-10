import mongoose,{Error} from 'mongoose';

// import { describe, it } from 'node:test';
import application from "../app";
import { beforeAll, afterEach, afterAll, test, expect, describe, it, expect } from '@jest/globals'
import request from 'supertest';

import {fakeAdmin, dbConnect, dbDisconnect, dropCollections} from '../database/fakeDB/admin';
import Admin from '../models/adminSchema';
import { debug } from 'console';



// Database Connections
beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());
afterEach(async () => await dropCollections)



describe('Create Admin Models', () => {
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

        const newAdmin = new Admin({ ...fake });
        try {
            await newAdmin.save()
        } catch (error) {
            expect(error).toBeDefined()
        }
        // expect().toThrowError(Error.ValidationError);
    })
})

describe('viewAll Admin Models', () => {
    it('it should display all Admins when returned true', async () => {
         const res = await (await request(application).get('/admin'))
            expect(res.status).toBe(200);

    })
    

})






function app(app: any) {
    throw new Error('Function not implemented.');
}


