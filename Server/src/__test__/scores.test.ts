import mongoose,{Error} from 'mongoose';

import request from 'supertest';
import app from '../app';
import { dbConnect, dbDisconnect, dropCollections} from '../database/fakeDB/admin';
import { Scores } from '../models/scoresSchema';

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
    let id = "62f4461511286a359ae4c7d5";
    // beforeAll(async () => {

    //     const scores = await Scores.findOne();
    //     id = scores?.user_id;
    // })

    // afterAll( async () => {
    //     const score = await Scores.findOneAndDelete({id});
    // })

    it('Should return 200', async () => {
        const res = await request(app).get(`users/scores/weekly/${id}`)
        expect(res.status).toBe(200);
    })
})