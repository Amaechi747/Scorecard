import {Request, Response, NextFunction} from 'express';
import Joi, {ValidationError} from 'joi';

//Validate Decadev details
export const decadevSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: {allow: ['dev', 'com']}}),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    confirmPassword: Joi.ref('password'),
    phoneNo: Joi.number(),
    stack: Joi.string(),
    squad: Joi.number().min(1),
    status: Joi.string(),
}).with('newPassword', 'confirmPassword')


//Validate Decadev function
export const validateDecadevDetails = async(req: Request, res: Response, next: NextFunction) => {
    try{
        //Validate input details
        const data =  req.body;
        delete req.body.user;
        const valid = await decadevSchema.validateAsync({...data});
        if(valid){
            next();
        }
    } catch(error: unknown){
        //Error to handler
        if(error instanceof ValidationError){
            const {message} = error.details[0];
            next(new Error(message));
        }
    }
}


//Validate Decadev Update/Edit Input Values
