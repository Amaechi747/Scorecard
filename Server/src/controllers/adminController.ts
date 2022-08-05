import { Request, Response, NextFunction } from 'express';
import asyncHandler  from 'express-async-handler';
import {createAdmin} from '../utils/adminCRUD';

export const addAdmin = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
  
        const data: IAdmin = req.body;
        const admin = await createAdmin(data)
        if (admin){
            console.log('I am here');
            res.status(200).json(admin);
        }
 
})


