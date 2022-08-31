import Joi, { ValidationError } from "joi";
import { Request, Response, NextFunction } from "express";

export const validateEmail = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const valid = await Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: {allow: ['dev', 'com']}})
        }).validateAsync(req.body);
        if(valid) {
            next()
        }
    } catch (error) {
        //Error to handler
        if(error instanceof ValidationError){
            const {message} = error.details[0];
            next(new Error(message));
        }
    }
}

//Validate Decadev password update
const passwordUpdateSchema = Joi.object({
    id: Joi.string().length(24),
    newPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.ref('newPassword'),
}).with('newPassword', 'confirmPassword')

//Validate Decadev Password update Function
export const validatePasswordUpdateInput = async(req: Request, res: Response, next: NextFunction) => {
    try{
        //validate input details
        const data = req.body;
        const valid =  await passwordUpdateSchema.validateAsync({...data});
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