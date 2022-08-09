import {Request, Response, NextFunction} from 'express';
import Joi, {ValidationError} from 'joi';

// const year = new Date().getFullYear();
// const maxSquadNo = ;


const adminUpdateSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
  

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'dev'] } }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
       

    confirmPassword: Joi.ref('password'),

    phoneNo: Joi.number(),

    squad: Joi.number()
        .min(1),

    status: Joi.string(),

    role: Joi.string(),


   
})
 


//Validate data
export const validateAdminUpdateDetails = async function(req: Request, res: Response, next: NextFunction){
    try {

        // Validate input details
        const data = req.body
        const valid = await adminUpdateSchema
        
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