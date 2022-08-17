import mongoose,{Error} from 'mongoose';

import request from 'supertest';
import app from '../app';
import {fakeUser, dbConnect, dbDisconnect, dropCollections} from '../database/fakeDB/user';
import { Scores } from '../models/scoresSchema';
import Decadev, { createDecadevSchema } from '../models/decadevSchema';
// import { describe, it } from 'node:test';

import { beforeAll, afterEach, beforeEach, afterAll, test, describe, it, expect } from '@jest/globals'



import Admin from '../models/adminSchema';
import { debug } from 'console';
import { SocketAddress } from 'net';



// Database Connections
beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());
afterEach(async () => await dropCollections)

describe('Tests for the Scores Endpoints', () => {
    let id: any ;
    beforeEach(async () => {
        const fakeDecadev = await fakeUser();
        const decadev = await fakeDecadev.save();

        const filter = {user_id: decadev._id};
        const scores = await Scores.findOne(filter).exec();
        console.log('I am here');
        id = scores?.user_id;
    })

    afterEach( async () => {
        const score = await Scores.findOneAndDelete({id});
        const admin = await Decadev.findOneAndDelete({id});
    })

    it('Should return 200', async () => {
        const res = await request(app).get(`/users/scores/weekly/${id}`)
        expect(res.status).toBe(200);
    })


})