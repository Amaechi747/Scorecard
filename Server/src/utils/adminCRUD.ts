import Admin from '../models/adminSchema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {emailService} from '../services/mailer';


const ADMIN = {
    
     async create(data: IAdmin){
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
    
            const emailSubstring = email.split('@')[1]
            // if(emailSubstring !== "decagonhq.com"){
            //     throw new Error('Please use a valid decagon staff email.')
            // }
            if(emailSubstring !== "decagon.dev"){
                throw new Error('Please use a valid decagon staff email.')
            }
    
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
    },
    
    // Edit Admin Details
    async edit (id: unknown , update: IAdminUpdate){
        try {
            //Set filter variable
            const filter = {_id: id};
            //Update
            const updatedAdmin = Admin.findOneAndUpdate(filter, update, {new: true});
            if(updatedAdmin){
                return updatedAdmin;
            }
        } catch (error) {
            throw new Error(`${error}`);
        }

    },

    // Activate Admin
    async activate(id: string){
        try{

            //Set filter variable
            const filter = {_id: id};
            //Search for admin in database
            const admin = await Admin.findOne(filter);
            if (admin){
                let {email, status, id} = admin;
                //Change Status
                status = "active";
                // admin["status"] = status;
                const token = jwt.sign({status, id}, `${process.env.JWT_SECRET}`, {
                    expiresIn: '1d'})
                // const token = jwt.sign({...admin}, `${process.env.JWT_SECRET}`, {
                //     expiresIn: '30d'})
                const url = `${process.env.BASE_URL}/admin/verify?token=${token}`;
                //Send email to applicant
                const text = `<p>Click to be verified as an admin <a href=" http://${ url }"> click here </a>.</p>`
                await emailService(email, url, text)
                return admin;
            }

         
                
        }catch(error){
            throw new Error(`${error}`);
        }
      

    },

    async verify(token: unknown){
        try{
            if(token){
                const decoded = jwt.verify(`${token}`, `${process.env.JWT_SECRET}`);
                if(decoded instanceof Object){
                    const {status, id} = decoded;

                     //Set filter variable
                    const filter = {_id: id};
                    const update = {status}
                    const activatedAdmin = await Admin.findOneAndUpdate(filter, update, {new: true});
                    return activatedAdmin;
                }
            }
        }catch(error){
            throw new Error(`${error}`);
        }
    },

    async deactivate(id: unknown){
        try {
            if(id){
                //Locate the admin and deactivate
                const filter = {_id: id};
                const update = {status: "inactive"};
                const deactivatedAdmin = await Admin.findOneAndUpdate(filter, update, {new: true});
                return deactivatedAdmin;
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    },

    async delete(id: unknown){
        try{
            if(id){
                //Find and delete
                const filter = {_id: id};
                const deletedAdmin = await Admin.findOneAndDelete(filter);
                return deletedAdmin;
            }
        }catch(error){
            throw new Error(`${error}`);
        }
    }
}








export default ADMIN;


