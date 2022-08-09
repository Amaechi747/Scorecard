import Stack from '../models/stackSchema';
import ADMIN from '../utils/adminCRUD';
import { Request, Response, NextFunction } from 'express';
import asyncHandler  from 'express-async-handler';

export const getAdminProfile = asyncHandler( async function (req:Request, res: Response) {
    
    // Expecting admins ID from req.params
    const adminId = req.params.id;
    const admin = await ADMIN.getAdmin(adminId);
    if(admin) {
        res.status(200).json(admin);
    }

} )

export const addNewImage = asyncHandler( async function (req: Request, res: Response) {
    if (req.file) {
        const adminId = req.params.id;
        // console.log('Path: ',req.file.path, '\n');

        const newImageUrl = await ADMIN.updateAdminImage(adminId, req.file.path);
        if(newImageUrl) {
            res.status(200).send(newImageUrl);
            return;
        }
    }
} )


export const createAdmin = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
        // Create admin
        const data: IAdmin = req.body;
        const admin = await ADMIN.create(data)
        if (admin){
            res.status(200).json(admin);
            return;
        }
 
})

export const editAdmin = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    const {id} = req.params;
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
    const {token} = req.query;
    const verified  = await ADMIN.verify(token)
    if(verified){
        res.status(200).send(verified);
        return;
    }
})

export const getAdmin = asyncHandler(async function (req: Request, res: Response, next: NextFunction) {
    //    Get users
    const getAllAdmins = await ADMIN.get();
    if (getAllAdmins) {
        res.status(200).send(getAllAdmins);
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

export const updateAdminPassword = asyncHandler( async function (req:Request, res: Response) {
    const { password: oldPass, newPassword: newPass } = req.body;
    const result = await ADMIN.changeAdminPassword(req.params.id, newPass, oldPass);
    if (result) {
        res.send({status: 'Success', message: 'Password has been updated'});
    }
} )
