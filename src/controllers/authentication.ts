import express, {Request, Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';
import User from '../services/user.service';


export const loginSuperAdmin = async function(req: Request, res: Response, next: NextFunction){
    const { email, password } = req.body;


}

export const loginUser = asyncHandler( async function (req: Request, res: Response, next: NextFunction) {
    const data: Idata = req.body;
    const userToken = await User.verify(data);
    if(userToken){
        res.status(200).send({message: "Success", data: userToken});
        return;
    }
    res.status(401).send(false);
    return;
})

export const logout = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    const data: Idata = req.body;
    const userToken = await User.logout();
}) 

