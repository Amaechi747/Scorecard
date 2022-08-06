import { Request, Response, NextFunction } from 'express';
import asyncHandler  from 'express-async-handler';
import {createAdmin, getAdmin, updateAdminImage, changeAdminPassword} from '../utils/adminCRUD';

export const addAdmin = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
  
    const data: IAdmin = req.body;
    const admin = await createAdmin(data)
    if (admin){
        // console.log('I am here');
        res.status(200).json(admin);
    }
 
})

export const getAdminProfile = asyncHandler( async function (req:Request, res: Response) {
    
    // Expecting admins ID from req.params
    const adminId = req.params.id;
    const admin = await getAdmin(adminId);
    if(admin) {
        res.status(200).json(admin);
    }

} )

export const addNewImage = asyncHandler( async function (req: Request, res: Response) {
    if (req.file) {
        const adminId = req.params.id;
        // console.log('Path: ',req.file.path, '\n');

        const newImageUrl = await updateAdminImage(adminId, req.file.path);
        if(newImageUrl) {
            res.status(200).send(newImageUrl);
            return;
        }
    }
} )

export const updateAdminPassword = asyncHandler( async function (req:Request, res: Response) {
    const { password: oldPass, newPassword: newPass } = req.body;
    const result = await changeAdminPassword(req.params.id, newPass, oldPass);
    if (result) {
        res.send('Password has been updated');
    }
} )