import Decadev from "../models/decadevSchema";
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { emailService } from "../services/mailer.service";
import { Scores, weeklyScoreSchema } from '../models/scoresSchema';

import mongoose, { LeanDocument, ObjectId } from 'mongoose';
import Stack from '../models/stackSchema';
import message from './emailTemplate';

// import Stack from '../models/stackSchema';
// import { deactivateAdmin } from "../controllers/adminController";


// interface IID extends mongoose.document{
//     id: Types.ObjectId
// }

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
            const decadev = await newDecadev.save();

            if(decadev){
                /********************************** Email Service to admin ************************************/
                //Send email to new Admin
                const { firstName, lastName } = decadev;
                const url = `${process.env.BASE_URL}/users/login`;
                const subject = `Decadev Login Details`
                //Send email to applicant
                const text = `<p>You have recently been added as a decadevv. <br>
                <span style="text-decoration: underline"> Login details <span> <br>
                <span style="text-decoration: none"> Email:<span> ${email} <br>
                <span style="text-decoration: none"> Password: <span> ${password} <br>
                <span style="text-decoration: none">Go to portal <a href=" http://${url}"> click here </a>. <span></p>`
                const mail = message(<string>firstName, text)

                
                await emailService(email, subject, mail, `${firstName} ${lastName}`);
                /********************************** Email Service to admin ************************************/

                return decadev;
            }
        } catch (error){
            throw new Error(`${error}`);
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

                let {email, status, id, firstName, lastName, password} = decadev;

                //Change Status
                status = "active";
                const token = jwt.sign({status, id}, `${process.env.JWT_SECRET}`, {expiresIn: '1d'})
                const url = `${process.env.BASE_URL}/users/verify?token=${token}`;

                const subject = 'Latest Decadev';
                //Send email to decadev
                const text = `<p>Click to verify your account as a decadev <a href="http://${url}"> click here</a>.</p>`;
                const mail = message(<string>firstName, text);

                await emailService(email, subject, mail, `${firstName} ${lastName}`);

                return "Your account has be verified successfully";
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
                console.log(decadevScore);
                return decadevScore;
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
        return;
    },

    //Get all decadev
    async get() {
        try {
            const getAllDecadev = Decadev.aggregate([
                {
                  $match: {}
                }, {
                  $lookup: {
                    from: 'stacks', 
                    localField: 'stack', 
                    foreignField: '_id', 
                    as: 'stack'
                  }
                }, {
                  $unwind: {
                    path: '$stack'
                  }
                }, {
                  $project: {
                    firstName: 1, 
                    lastName: 1, 
                    email: 1, 
                    squad: 1, 
                    stack: {
                      name: 1
                    }
                  }
                }
              ]) 
            
            return getAllDecadev
        }
        
        catch (error) {

         throw new Error(`${error}`);

        }
    },


    

    //Update Password
    async updatePassword(userData: any, password: string){
               const {_id} = userData;
               const emailSubstring = password.split('@')[1]
               if(emailSubstring !== 'decagon.dev'){
                    throw new Error('Email must be a valid decadev email')
               }
                console.log(userData);
                //Ensure Password is different from former
                const decadev = await Decadev.findOne({_id});
                console.log(decadev);
                const formerPassword: any = decadev?.password;
                const email = decadev?.email;

                if( !password ){
                    throw new Error('Please input a new password.')
                }

                if(await bcrypt.compare(password, formerPassword)){
                    throw new Error('Password must be different from the old password');
                }
                
                // Hash Password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const update = {password: hashedPassword};
                const user = await Decadev.findOneAndUpdate({email: email}, update, {new: true, runValidators: true});
                const subject = "Password Update";

                //Send email to decadev
                const text = `<p>Your login password was changed.</br>
                <span style="text-decoration: underline"> Login Details </span> </br>
                Email: ${email} </br>
                New Login Password: ${password} </br>
                </p>
               `;
                await emailService(email, subject, text);
                if(user){
                    return user;
                }

    


      
    },

    async performanceTracker(id: string){
      const dataId= new mongoose.Types.ObjectId(id)
      const performance =  await Scores.aggregate(
            [
                {
                  '$match': {
                    'user_id':  dataId
                  }
                }, {
                  '$project': {
                    'scoresWeekly': 1, 
                    '_id': 0
                  }
                }
              ]
            )
            
            return performance[0].scoresWeekly;

    },

    async getCurrentPerformance(id: string){
        const performance = await this.performanceTracker(id);
        const currentPerformance = this.calculatePerformance(performance);

   
        return currentPerformance;
    },

    calculatePerformance(performance: any){

        if(performance.length === 1 || performance.length === 0){
            const percentageDifferenceCommulative = 0.000;
            const percentageDifferenceAlgorithm = 0.000;
            const percentageDifferenceAgile = 0.000;
            const percentageDifferenceAssessment = 0.000;
            const percentageDifferenceWeeklyTask = 0.000
            const result = {...performance[0], 
                percentageDifferenceCommulative,
                percentageDifferenceAlgorithm,
                percentageDifferenceAgile,
                percentageDifferenceAssessment,
                percentageDifferenceWeeklyTask
            }
            return result;
        }
        const lastWeekPerformance = performance[performance.length - 1];
        const  previousWeekPerformance = performance[performance.length - 2];
        
        const cummulativeScoreDifference = lastWeekPerformance.cummulative - previousWeekPerformance.cummulative;
        const percentageDifferenceCommulative = ((cummulativeScoreDifference / lastWeekPerformance.cummulative)).toFixed(3);  

        const algorithmScoreDifference = lastWeekPerformance.algorithm - previousWeekPerformance.algorithm;
        const percentageDifferenceAlgorithm = ((algorithmScoreDifference / lastWeekPerformance.algorithm)).toFixed(3);   

        const agileScoreDifference = lastWeekPerformance.agileTest - previousWeekPerformance.agileTest;
        const percentageDifferenceAgile = ((agileScoreDifference / lastWeekPerformance.agileTest)).toFixed(3); 

        const assessmentScoreDifference = lastWeekPerformance.assessment - previousWeekPerformance.assessment;
        const percentageDifferenceAssessment = ((assessmentScoreDifference / lastWeekPerformance.assessment)).toFixed(3); 

        const weeklyTaskScoreDifference = lastWeekPerformance.weeklyTask - previousWeekPerformance.weeklyTask;
        const percentageDifferenceWeeklyTask = ((weeklyTaskScoreDifference / lastWeekPerformance.weeklyTask)).toFixed(3); 
        
        
        const result = {...lastWeekPerformance, 
            percentageDifferenceCommulative,
            percentageDifferenceAlgorithm,
            percentageDifferenceAgile,
            percentageDifferenceAssessment,
            percentageDifferenceWeeklyTask
        };
        
        return result;


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
    async cummulativePerformance(id: string) {
        const weeklyPerformance = await Scores.findById(id);
        const { scoresWeekly }:any = weeklyPerformance;
        const weeklyCumulative = scoresWeekly.map((score:IWeeklyScore,index:number) => `{week ${index+1}: ${score.cummulative}}`);
        return weeklyCumulative;
    }


}

export default DECADEV;