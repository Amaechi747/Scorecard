import {Request, Response, NextFunction} from 'express';
import Joi, {ValidationError} from 'joi';


const loginSchema = Joi.object({

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['dev', 'com'] } }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
  
})


//Validate data
export const loginDetailsValidation = async function(req: Request, res: Response, next: NextFunction){
    try {

        // Validate input details
        const data = req.body
        const valid = await loginSchema
            .validateAsync({...data});
        if(valid){
            next();
        }
    } catch (error: unknown ) {

        // Send Error to handler
        if (error instanceof ValidationError){
            const {message} = error.details[0];
            next(new Error(message));
        }
           
    }
}