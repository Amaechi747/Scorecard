import Admin from '../models/adminSchema';
import bcrypt from 'bcryptjs';


// Error.prototype.status = 403;

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

export const getAdmin = async function(id: string) {
    try {
        // use id to get data from db
        const admin = await Admin.findById(id, { password: 0 });
        if(admin) {
            return admin;
        } else {
            throw new Error("Admin not found!");
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
}

export const updateAdminImage = async function(id: string, path: string) {
    try {
        const updateDoc = await Admin.updateOne(
            { _id: id },
            { $set: { imageUrl: path } },
            { upsert: true }
        );
        if (updateDoc.modifiedCount) {
            return path;
        } else {
            throw new Error("Image not updated");
        }
    } catch (error) {
        throw new Error(`${error}`);
        
    }
}

export const changeAdminPassword = async function (id: string, newPass: string, oldPass: string) {
    try {
        const admin = await Admin.findOne({ _id: id })
        const match = await bcrypt.compare(oldPass, <string>admin?.password);
        if (admin && match) {
            // Hash new Password
            if(oldPass === newPass)
                throw new Error("New password may not be the same as previous password");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPass, salt);
            admin.password = hashedPassword;
            return await admin.save()
        } else {
            throw new Error("Current password is wrong");
        }
    } catch (error: unknown) {
        throw new Error(`${error}`);
        
    }
}