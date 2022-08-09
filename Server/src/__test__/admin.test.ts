import { exec } from 'child_process';
import mongoose,{Error} from 'mongoose';
// import { describe, it } from 'node:test';
import { beforeAll, afterEach, afterAll, describe, it, expect } from '@jest/globals'
import supertest from 'supertest';
import {fakeAdmin, dbConnect, dbDisconnect, dropCollections} from '../database/fakeDB/admin';
import Admin from '../models/adminSchema';



// Database Connections
beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());
afterEach( async () => await dropCollections)

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
        const newAdmin = new Admin({...fake});
        expect(await newAdmin.save()).toThrow(Error.ValidationError);
    })
})



