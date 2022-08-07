import {Request, Response, NextFunction} from 'express';
import Joi, {ValidationError} from 'joi';

// const year = new Date().getFullYear();
// const maxSquadNo = ;


const adminSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['dev'] } }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    confirmPassword: Joi.ref('password'),

    phoneNo: Joi.number(),

    squad: Joi.number()
        .min(1),

    status: Joi.string(),

    role: Joi.string()
        .required(),

   
})

// Validate Admin password update input
const adminPasswordUpdateSchema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    newPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    confirmPassword: Joi.ref('newPassword'),
})

//Validate user function
export const validateAdminDetails = async function(req: Request, res: Response, next: NextFunction){
    try {

        // Validate input details
        const data = req.body
        const valid = await adminSchema
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


//Validate user function
export const validateAdminPasswordUpdateInput = async function(req: Request, res: Response, next: NextFunction){
    try {

        // Validate input details
        const data = req.body
        const valid = await adminPasswordUpdateSchema
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

//Vaidate Stack input
const stackSchema = Joi.object({
    name: Joi.string().required(),
    imageUrl: Joi.string().required()
})

//Validate Stack input function
export const validateStackInput = async function(req: Request, res: Response, next: NextFunction){
    try {
        let datainput = req.body;
        const valid = await stackSchema.validateAsync({...datainput});
        if(valid){
            next();
        }
    } catch (error) {
        
    }
}