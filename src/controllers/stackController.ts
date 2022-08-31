import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import ADMIN from '../utils/adminCRUD';


//STACK CONTROLLER FUNCTION

/* View All Stack */
export const viewAllStack = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    
    if(req.query.stackId && req.body.user.role !== "SuperAdmin"){
        const {stackId}:any = req.query;
        const userId = req.body.user._id
        const getStack = await ADMIN.getStackById(userId, stackId);

        if(getStack){
           res.status(200).send({status: "Success"});   
           return      
        }

        res.status(401).send({status: "failed", message: "You are not authorized to visit this route"}); 
        return   
    }

    const stacks = await ADMIN.viewAllStack();
    if (stacks) {
        res.status(200).send({ status: 'success', message: 'Stack retrieved successfully', data: stacks });
        return 
        
    }
})
/* Create Stack Contoller */
export const addStack = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    let data = req.body;
    const stack = await ADMIN.addStack(data);
    if (stack) {
        res.status(201).send({ status: 'success', message: 'Stack created successfully', data: stack })
        return
    }
})

/* Edit Stack */
export const editStack = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const update = req.body;
    const stackToEdit = await ADMIN.editStack(id, update);
    if (stackToEdit) {
        res.status(201).send({ status: 'success', message: 'Stack updated successfully', data: stackToEdit })
        return;
    }
})

/* Delete Stack */
export const deleteStack = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const stackToDelete = await ADMIN.deleteStack(id);
    if (stackToDelete) {
        res.status(201).send({ status: 'success', message: 'Stack deleted successfully', data: stackToDelete })
        return;
    }
})

export const viewAllStackById = asyncHandler( async function (req: Request, res: Response, next:NextFunction){

    console.log(req.query)
    // const {userId, stackId} = req.query;

    // if(userId && stackId){
    //     const getStack = await ADMIN.getStackById(userId, stackId);
    //     if(getStack){
    //         res.status(201).send({status: "Success", message: "You have done it"});
    //         return;
    //     }
    // }
    
})