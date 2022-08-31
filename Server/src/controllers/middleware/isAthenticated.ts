import express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import isUser from '../../services/isUser.service';


export const isAthenticated = async function(req: Request, res: Response, next: NextFunction){
    let token;
    if(((req.headers.authorization !== undefined) && (req.headers.authorization.startsWith('Bearer'))) ){
        try{
            token = req.headers.authorization.split(' ')[1] 
            // Verify Token
            if (process.env.JWT_SECRET){
                const verified = jwt.verify(token, process.env.JWT_SECRET);
                if(verified && verified instanceof Object){
                    const { email } = verified.id;
                    const user = await isUser(email)
                    req.body.user = user;
                    next(); 
                }
            }
                    
        }catch(error){
            next(new Error(`${error}`));
        }
    }
    if(!token){
        // res.status(401).send(false);
        next(new Error('Not authorized, no token'));
    }

}