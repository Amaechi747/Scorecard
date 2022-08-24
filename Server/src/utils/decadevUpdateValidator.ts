import { Request, Response, NextFunction} from 'express';
import Joi, {ValidationError} from 'joi';

//Validate Decadev Update details
const decadevUpdateSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30),
    lastName: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2, tlds: {allow: ['dev', 'com']}}),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: Joi.ref('password'),
    phoneNo: Joi.number(),
    stack: Joi.string(),
    squad: Joi.string().min(1),
    status: Joi.string(),
})

export const validateDecadevUpdateDetails = async (req: Request, res: Response, next: NextFunction) => {
    try{
        //validate update input details
        const data = req.body;
        console.log(data)
        const valid = await decadevUpdateSchema.validateAsync({...data});
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