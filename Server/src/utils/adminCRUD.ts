import Admin from '../models/adminSchema';
import bcrypt from 'bcryptjs';


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
            if(emailSubstring !== "decagonhq.com"){
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


    async get() {
        try {
const getAllAdmin = Admin.aggregate([{
                $match: {
                    role: {
                        $nin:
                        ['SuperAdmin']
                    }
                }
            }]) 
            
            return getAllAdmin
        }
        
        catch (error) {

         throw new Error(`${error}`);

        }
    }



}









export default ADMIN;


