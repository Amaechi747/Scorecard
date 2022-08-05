import { Request, Response, NextFunction } from 'express';
import asyncHandler  from 'express-async-handler';
import ADMIN from '../utils/adminCRUD';

export const createAdmin = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
        // Create admin
        const data: IAdmin = req.body;
        const admin = await ADMIN.create(data)
        if (admin){
            console.log('I am here');
            res.status(200).json(admin);
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
    }
})


