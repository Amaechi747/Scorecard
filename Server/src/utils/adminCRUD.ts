import Admin from '../models/adminSchema';
import bcrypt from 'bcryptjs';



export const createAdmin = async function(data: IAdmin){
    try {
       
        //Get data
        const {
            firstName, 
            lastName, 
            email,
            password,
            role,
            stack
        } = data;

        //Save data
            // Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newAdmin = new Admin({...data, password: hashedPassword})
            const admin = await newAdmin.save();
            
            if(admin){
                return admin;
            }
            
        } catch (error) {
        throw new Error(`${error}`);
    }
}