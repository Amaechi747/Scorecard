import { Request, Response, NextFunction} from 'express';
import mongoose, {Schema} from "mongoose";
import { createDecadevSchema, Decadev } from "../models/adminServiceSchema";

//Function to fetch decadev email from database
export const checkDecadev = async (decadev: ILogin)=>{
    const decadevEmail = await Decadev.find({email: decadev.email});
    return decadevEmail;
}

//Controller for Admin to create an Account for decadevs
export const createDecadev = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let decadevExist = await checkDecadev(req.body);
        if(decadevExist.length > 0){
            throw new Error('Decadev already exists');
        }

        const newDecadev = new Decadev({
            firstNName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            stack: req.body.stack,
            squad: req.body.squad
        })
        const decadev = await newDecadev.save();
        res.status(200).send('Decadev successfully registered');
    } catch(err){
        res.render('error');
    }
} 

//Controller for Admin to update the details of a decadev
export const updateDecadev = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const decadev = await Decadev.findById(req.params.id);
        if(!decadev) return;
        decadev.firstName = req.body.firstname;
        decadev.lastName = req.body.lastname;
        decadev.email = req.body.email;
        decadev.stack = req.body.stack;
        decadev.squad = req.body.squad;

        decadev.save();
        return res.status(200).send("Decadev Updated Successfully!")
    } catch(err){
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