import Decadev from "../models/decadevSchema";
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { emailService } from "../services/mailer";
import { Scores, weeklyScoreSchema } from '../models/scoresSchema';
import { LeanDocument, ObjectId } from 'mongoose';
import Stack from '../models/stackSchema';
import message from './emailTemplate'
// import Stack from '../models/stackSchema';
// import { deactivateAdmin } from "../controllers/adminController";


export const DECADEV = {
    async create(data: IDecadev){
        try{
            //Get decadev data
            const {firstName, lastName, email, password, stack} = data;

            // const emailSubstring = email.split('@')[1];
            // if (emailSubstring !== "decagon.dev"){
            //     throw new Error('Please provide a valid decagon student email')
            // }

            //Save decadev
            //Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(<string>password, salt);


            const stackId = await this.getOneStack(<string>stack);


            const newDecadev = new Decadev({...data, password: hashedPassword, stack: stackId});
            newDecadev.validateSync();
            const decadev = newDecadev.save();

            if(decadev){
                return decadev;
            }
        } catch (error){
            throw new Error(`${error}`);
        }
    },
    
    async updatePassword(id: string, password: string) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const update = { $set: { password: hashedPassword } };
            // const result = await Decadev.updateOne(filter, update)

            const updatedDecadev = await Decadev.findByIdAndUpdate(id, update, { new: true });
            if(updatedDecadev) {
                return updatedDecadev;
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    },
    // async getDecadev(id: string){
    //     try{
    //         //use id to get data from db
    //         const decadev = await Decadev.findById(id, { password: 0});
    //         if(decadev){
    //             return decadev;
    //         } else {
    //             throw new Error('Decadev not found');
    //         }
    //     } catch(error){
    //         throw new Error(`${error}`);
    //     }
    // },

    // Edit Decadev Details
    async edit(id: unknown, update: IDecadevUpdate){
        try{
            //Set filter variable
            const filter = {_id: id};
            //Update
            const {password, stack, ...data} = update;
            let stackId;
            if(stack){
                stackId = await this.getOneStack(stack);
            };

            const updatedDecadev = Decadev.findOneAndUpdate(filter, { ...data, stack: stackId }, { new: true });
            if(updatedDecadev){
                return updatedDecadev;
            }
        } catch (error){
            throw new Error(`${error}`);
        }
    }, 

    //Delete Decadev
    async delete(id: unknown){
        try{
            if(id){
                //Find and delete
                const filter = {_id: id};
                const deletedDecadev = await Decadev.findOneAndDelete(filter);
                return deletedDecadev;
            }
        } catch (error){
            throw new Error(`${error}`);
        }
    },

    //Activate Decadev
    async activate(id: string){
        try{
            //Set filter variable
            const filter = {_id: id};
            //search for decadev in database
            const decadev = await Decadev.findOne(filter);
            if(decadev){
                let {email, status, id, firstName, lastName} = decadev;
                //Change Status
                status = "active";
                const token = jwt.sign({status, id}, `${process.env.JWT_SECRET}`, {expiresIn: '1d'})
                const url = `${process.env.BASE_URL}/users/verify?token=${token}`;
                const subject = 'Latest Decadev';
                //Send email to decadev
                const text = `<p>Click to verify your account as a decadev <a href="http://${url}"> click here</a>.</p>`;
                const mail = message(<string>firstName, text);

                await emailService(email, subject, mail, `${firstName} ${lastName}`);
                return decadev;
            }
        } catch (error){
            throw new Error(`${error}`);
        }
    },

    async verify(token: unknown){
        try{
            if(token){
                const decoded = jwt.verify(`${token}`, `${process.env.JWT_SECRET}`);
                if(decoded instanceof Object){
                    const {status, id} = decoded;

                    //Set fileter variable
                    const filter = {_id: id};
                    const update = {status};
                    const activatedDecadev = await Decadev.findOneAndUpdate(filter, update, {new: true});
                    return activatedDecadev;
                }
            }
        } catch(error) {
            throw new Error(`${error}`);
        }
    },

    async deactivate(id: unknown){
        try{
            if(id){
                //locate the decadev and deactivate
                const filter = {_id: id};
                const update = {status: "inactive"};
                const deactivatedDecadev = await Decadev.findOneAndUpdate(filter, update, {new: true});
                return deactivatedDecadev;
            }
        } catch(error) {
            throw new Error(`${error}`);
        }
    },
    // AddScore for a decadev, using decadev's ID
    async addScore(id: String, data: IWeeklyScore) {
        try {
            const { assessment, agileTest, algorithm, weeklyTask} = data;
            data.cummulative = (assessment * 0.2) + (algorithm * 0.2) + (agileTest * 0.2) + (weeklyTask * 0.4)
            if(id) {
                const decadevScore = await Scores.findOneAndUpdate({ user_id: id }, { $push: { scoresWeekly: data } }, { new: true });
                return decadevScore;
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
        return;
    },

    //Get a Stack
    async getOneStack(str: string){
        try{
            const filter = {name: str};
            const stack = await Stack.findOne(filter);
            if(stack){
                return stack._id;
            }
        }catch(error){
            throw new Error(`${error}`);
        }
        return;
    },

}