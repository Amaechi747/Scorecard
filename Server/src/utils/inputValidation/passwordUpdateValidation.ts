import {Request, Response, NextFunction} from 'express';
import Joi, {ValidationError} from 'joi';


const passwordUpdateSchema = Joi.object({

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
  
    confirmPassword: Joi.ref('password')
       
})


//Validate data
export const updatePasswordDetailsValidation = async function(req: Request, res: Response, next: NextFunction){
    try {

        // Validate input details
        const data = req.body
        const valid = await passwordUpdateSchema
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