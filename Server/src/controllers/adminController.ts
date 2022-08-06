import { Request, Response, NextFunction } from 'express';
import asyncHandler  from 'express-async-handler';
import Stack from '../models/stackSchema';
import ADMIN from '../utils/adminCRUD';

// const ADMIN_API = {

// }

export const createAdmin = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
        // Create admin
        const data: IAdmin = req.body;
        const admin = await ADMIN.create(data)
        if (admin){
            console.log('I am here');
            res.status(200).json(admin);
            return;
        }
 
})

export const editAdmin = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    const {id} = req.params;
    console.log('Req',id)
    const update: IAdminUpdate = req.body;
    // Update details
    const updatedAdminData = await ADMIN.edit(id, update)
    //Send updated data
    if(updatedAdminData){
        res.status(201).send(updatedAdminData);
        return;
    }

})

export const activateAdmin = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    const {id} =req.params;
    const activated = await ADMIN.activate(id);
    if(activated){
        res.status(200).send(activated);
        return;
    }
})

export const verifyAdmin = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    // Get token
    console.log(req.query);
    const {token} = req.query;
    const verified  = await ADMIN.verify(token)
    if(verified){
        res.status(200).send(verified)
        return;
    }
})

export const deactivateAdmin = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    //Get admin Id
    const {id} = req.params;
    const deactivated = await ADMIN.deactivate(id);
    if(deactivated){
        res.status(201).send(deactivated)
        return;
    }
})

export const deleteAdmin = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    // Get admin Id
    const {id} = req.params;
    const deleted = await ADMIN.delete(id);
    if(deleted){
        res.status(201).send(deleted);
        return;
    }
})


//CONTROLLER FUNCTION

/* View All Stack */
export const viewAllStack = asyncHandler(async function(req: Request, res: Response, next: NextFunction){
    const stacks = await Stack.find({});
    res.status(200).json(stacks);
})
/* Create Stack Contoller */
export const addStack = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const stack = await new Stack(data)
    await stack.save();
    res.status(301).json(stack)
})

/* Edit Stack */
export const editStack = asyncHandler(async function(req:Request,res:Response,next:NextFunction){
    const {id} = req.params;
    const stackToEdit = await Stack.findById(id,{...req.body});
    res.json(stackToEdit)
})

/* Delete Stack */
export const deleteStack = asyncHandler(async function(req:Request,res:Response,next:NextFunction){
    const {id} = req.params;
    const stackToDelete = await Stack.findByIdAndDelete(id);
    res.json(stackToDelete)
})