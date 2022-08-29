import {Request, Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';


const addImageHandler = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    try {
        delete req.body.user;
        if(req.file){
            console.log('For File: ', req.file)
            req.body.imageUrl = req.file.path;
            next();
        }
    } catch (error) {
        next(new Error(`${error}`))
    }
  
})

export default addImageHandler;