import { Request, Response, NextFunction} from 'express';
import mongoose, {Schema} from "mongoose";
import { createDecadevSchema, Decadev} from "../models/adminServiceSchema";
const debug = require('debug')('live-project-scorecard-sq011a:server');

//Function to fetch decadev email from database
export const checkDecadev = async (decadev: ILogin)=>{
    const decadevEmail = await Decadev.findOne({email: decadev.email});
    return decadevEmail;
}

//Controller for Admin to create an Account for decadevs
export const createDecadev = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let decadevExist = await checkDecadev(req.body);
        if(decadevExist){
            throw new Error('Decadev already exists');
        }

        const newDecadev = new Decadev({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            stack: req.body.stack,
            phoneNo: req.body.phoneNo,
            squad: req.body.squad
        })
        const decadev = await newDecadev.save();
        console.log(decadev);
        return res.status(200).send('Decadev successfully registered');
    } catch(err){
        debug('Error: ', err);
        return res.status(404).send('error');
    }
} 

//Controller for Admin to update the details of a decadev
export const updateDecadev = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const decadev = await Decadev.findById(req.params.id);
        console.log(decadev, '88888888888888')
        if(!decadev) return;
        decadev.firstName = req.body.firstname || decadev.firstName;
        decadev.lastName = req.body.lastname || decadev.lastName;
        decadev.email = req.body.email || decadev.email;
        decadev.stack = req.body.stack || decadev.stack;
        decadev.phoneNo = req.body.phoneNo || decadev.phoneNo;
        decadev.squad = req.body.squad || decadev.squad;

        decadev.save();
        return res.status(200).send("Decadev Updated Successfully!")
    } catch(err){
        debug('Error: ', err);
        return res.status(400).send("Decadev Not Found!");
    }
}

//Controller for Admin to delete a Decadev's account
export const deleteDecadev  = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const decadev: any =  await Decadev.findById(req.params.id);
        await decadev.remove();
        return res.status(200).send("Decadev Deleted Successfully!")

    } catch(err){
        return res.status(400).send("Decadev Not Found!")
    }
}


//Controller to Activate the account of Decadev
export  const activateDecadev = async(req: Request, res: Response, next: NextFunction) => {
    try{

    } catch(err){
        return res.status(400).send("Decadev Not Found")
    }
}

//Controller to Deactivate the account of Decadev
export  const deactivateDecadev = async(req: Request, res: Response, next: NextFunction) => {
    try{
        
    } catch(err){
        return res.status(400).send("Decadev Not Found")
    }
}