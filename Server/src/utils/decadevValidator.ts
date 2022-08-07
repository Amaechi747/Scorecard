import {Request, Response, NextFunction} from 'express';
import Joi, {ValidationError} from 'joi';

//Validate Decadev details
const decadevSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: {allow: ['dev']}}),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    confirmPassword: Joi.ref('password'),
    phoneNo: Joi.number(),
    squad: Joi.number().min(1),
    status: Joi.string(),
})

//Validate Decadev password update
const decadevPasswordUpdateSchema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    newPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.ref('password'),
})

//Validate Decadev function
export const validateDecadevDetails = async(req: Request, res: Response, next: NextFunction) => {
    try{
        //Validate input details
        const data =  req.body;
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

//Validate Decadev Password update Function
export const validateDecadevPasswordUpdateInput = async(req: Request, res: Response, next: NextFunction) => {
    try{
        //validate input details
        const data = req.body;
        const valid =  await decadevPasswordUpdateSchema.validateAsync({...data});
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
