import express, {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/adminSchema';

const superAdminRoute = async function (req: Request, res: Response, next: NextFunction){
    try{
        const data  = req.body;
        const defaultPassword = process.env.superUser;
        if(defaultPassword !== undefined){
            const salt = await bcrypt.genSalt(12);
            const hashedSuperPassword = await bcrypt.hash(defaultPassword, salt);
            const {firstName, lastName, email, password, role} = data;
            const newSalt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, newSalt);
            if(await bcrypt.compare(password, hashedSuperPassword)){
                const superAdmin = new Admin({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    role: "SuperAdmin"
                })
                await superAdmin.save();
                res.status(200).json({
                    message: "Super Admin Created Successfully",
                    data: superAdmin
                })
            }

        }
        
    }catch(error){
        console.log(error)
        throw new Error(`${error}`)
    }
}

export default superAdminRoute;

