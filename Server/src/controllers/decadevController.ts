import { Request, Response, NextFunction } from 'express';
import asyncHandler from "express-async-handler";
import Decadev from '../models/decadevSchema';
import { DECADEV } from '../utils/decadevCRUD';


//Controller for Admin to create an Account for decadevs
export const createDecadev = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Create decadev
    const data: IDecadev = req.body;
    const decadev = await DECADEV.create(data);
    if (decadev) {
        res.status(200).send({ status: 'success', message: "Decadev account created successfully", data: decadev });
        return;
    }
})

//Controller for Admin to update the details of a decadev
export const editDecadev = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const update: IDecadevUpdate = req.body;
    //Update details
    const updatedDecadevData = await DECADEV.edit(id, update)
    //Send updated data
    if (updatedDecadevData) {
        res.status(201).send({ status: 'success', message: "Update saved" });
        return;
    }
})

//Controller for Admin to delete a Decadev's account
export const deleteDecadev = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Get Decadev Id
    const { id } = req.params;
    const deleted = await DECADEV.delete(id);
    if (deleted) {
        res.status(200).send({ status: 'success', message: "Decadev account deleted successfully" });
        return;
    }
    return;
})

export const activateDecadev = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const activated = await DECADEV.activate(id);
    if (activated) {
        res.status(200).send({ status: 'success', message: "Decadev account activated" });
        return;
    }
})

export const verifyDecadev = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //Get token
    const { token } = req.query;
    const verified = await DECADEV.verify(token);
    if (verified) {
        res.status(200).send({ status: 'success', message: "Account verified successfully" });
        return;
    }
})

export const deactivateDecadev = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //Get Decadev Id
    const { id } = req.params;
    const deactivated = await DECADEV.deactivate(id);
    if (deactivated) {
        res.status(201).send({ status: 'success', message: "Decadev account deactivated" });
        return;
    }
})

export const addScoreForDecadev = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const addedScore = await DECADEV.addScore(id, req.body);
    if (addedScore) {
        res.status(200).send(addedScore);
        return;
    }
})



export const updatePassword = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    const data = {...req.body};
    const {password} = data;
    const passwordIsUpdated = await DECADEV.updatePassword(req.body.user, password); 
    
    res.status(200).send({status: "Success", message: "Password Updated Successfully"});

    return;
   

export const getCurrentPerformance = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    const {id} =req.params;
    const currentPerformance = await DECADEV.getCurrentPerformance(id);
    console.log('I am here',currentPerformance);
    res.status(200).send({
        message:"Success",
        data: currentPerformance
    })
  return; 
})


})

export const performanceTracker = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const performance = await DECADEV.performanceTracker(id);

    res.status(200).send({
        message: "Success",
        data: performance
    })

    return;
})

export const getCummulativePerformance = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const currentPerformance = await DECADEV.cummulativePerformance(id);

    res.status(200).send({
        message: "Success",
        data: currentPerformance
    })

    return;
})


