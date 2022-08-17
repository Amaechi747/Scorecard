import { Request, Response, NextFunction} from 'express';
import { DECADEV } from '../utils/decadevCRUD';
import asyncHandler from "express-async-handler";
import User from '../services/user.service'
import Decadev from '../models/decadevSchema';


//Controller for Admin to create an Account for decadevs
export const createDecadev = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Create decadev
    const data: IDecadev = req.body;
    const decadev = await DECADEV.create(data);
    if(decadev){
        res.status(200).send("Decadev account created successfully");
        return;
    }
}) 

//Controller for Admin to update the details of a decadev
export const editDecadev = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const update: IDecadevUpdate = req.body;
    //Update details
    const updatedDecadevData = await DECADEV.edit(id, update)
    //Send updated data
    if(updatedDecadevData){
        res.status(201).send("Update saved");
        return;
    }
})

//Controller for Admin to delete a Decadev's account
export const deleteDecadev  = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    // Get Decadev Id
    const {id} = req.params;
    const deleted = await DECADEV.delete(id);
    if(deleted){
        res.status(204).send("Decadev account deleted successfully");
        return;
    }
    return;
})

export const activateDecadev = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const activated = await DECADEV.activate(id);
    if(activated){
        res.status(200).send("Decadev account activated");
        return;
    }
})

export const verifyDecadev = asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
    //Get token
    const {token} = req.query;
    const verified = await DECADEV.verify(token);
    if(verified){
        res.status(200).send("Account verified successfully");
        return;
    }
})

export const deactivateDecadev = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    //Get Decadev Id
    const {id} = req.params;
    const deactivated = await DECADEV.deactivate(id);
    if(deactivated){
        res.status(201).send("Decadev account deactivated");
        return;
    }
})

export const addScoreForDecadev = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    const {id} = req.params;
    const addedScore = await DECADEV.addScore(id, req.body);
    if(addedScore){
        res.status(200).send(addedScore);
        return;
    }
})


export const updatePassword = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    const data = {...req.body};
    const {password} = data;
    // if (req.headers.authorization.split(' ')[1] !== undefined ){
    //     const token = req.headers.authorization.split(' ')[1] 

    // }
    //Get token
    const token = req.cookies.token;
    const passwordIsUpdated = await DECADEV.updatePassword(token, password); 



    return;

   
})

export const performanceTracker = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    const {id} = req.params;
    const performance = await DECADEV.performanceTracker(id);
   
    res.status(200).send({
        message: "Success",
        data: performance
    })

    return;
})

export const getCurrentPerformance = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    const {id} =req.params;
    const currentPerformance = await DECADEV.getCurrentPerformance(id);
    
    res.status(200).send({
        message:"Success",
        data: currentPerformance
    })

  return; 
})