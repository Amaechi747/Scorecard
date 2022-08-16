import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { LeanDocument } from 'mongoose';
import { emailService } from './mailer';
import Decadev from '../models/decadevSchema';
import Admin from '../models/adminSchema';
import message from '../utils/emailTemplate';

async function sendPasswordResetLink(user: LeanDocument<Partial<IDecadev | IAdmin>>) {
    try{
        if(user){
            let {email, firstName, lastName, _id} = user;
            const token = jwt.sign({ id: _id }, `${process.env.JWT_SECRET}`, {expiresIn: '1d'})
            const url = `${process.env.BASE_URL}/reset_password?token=${token}`;
            //Send email to user
            const subject = `Scorecard password Reset`
            const text = `<p>Click to reset your password on Scorecard <a href="http://${url}"> click here</a>.</p>`
            const mail = message(<string>firstName, text);
            await emailService(email, subject, mail, `${firstName} ${lastName}`);
            return user;
        }
    } catch (error){
        throw new Error(`${error}`);
    }
}

async function resetPassword(id: string, password: string) {
    let user = await Decadev.findById(id);
    if(!user) {
        user = await Admin.findById(id);
    }
    if(user) {
        if(user?.status === 'active') {
            // Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
            return await user.save();
        } else {
            throw new Error('Account not activated cannot reset password')
        }
    }
    throw new Error('Invalid User')
}

async function userExists(query: { email: string }) {
    let user = await Decadev.findOne(query);
    if(user) {
        return user.toObject();
    } else {
        user = await Admin.findOne(query);
        if(user) {
            return user.toObject();
        }
    }
    return null;
}

export default {
    sendPasswordResetLink,
    userExists,
    resetPassword
}