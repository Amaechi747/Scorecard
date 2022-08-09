import Admin from '../models/adminSchema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { emailService } from '../services/mailer';
import Stack from '../models/stackSchema';



const ADMIN = {
    // Error.prototype.status = 403;
    async createAdmin(data: IAdmin){
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
    },

    async getAdmin (id: string) {
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
    },

    async updateAdminImage (id: string, path: string) {
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
    },

    async changeAdminPassword (id: string, newPass: string, oldPass: string) {
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
    },

    async create(data: IAdmin) {
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
            if (emailSubstring !== "decagon.dev") {
                throw new Error('Please use a valid decagon staff email.')
            }

            //Save data
            // Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newAdmin = new Admin({ ...data, password: hashedPassword })
            const admin = await newAdmin.save();

            if (admin) {

            /********************************** Email Service to admin ************************************/
            //Send email to new Admin
            const url = `${process.env.BASE_URL}/admin/login`;
            const subject = `Admin Login Details`
            //Send email to applicant
            const text = `<p>You have recently been added as an admin. <br>
            <span style="text-decoration: underline"> Login details <span> <br>
            <span style="text-decoration: none"> Email:<span> ${email} <br>
            <span style="text-decoration: none"> Password: <span> ${password} <br>
            <span style="text-decoration: none">Go to portal <a href=" http://${url}"> click here </a>. <span></p>`
            await emailService(email, subject, text)
            /********************************** Email Service to admin ************************************/

                return admin;
            }

        } catch (error) {
            throw new Error(`${error}`);
        }
    },

    // Edit Admin Details
    async edit(id: unknown, update: IAdminUpdate) {
        try {
            //Set filter variable
            const filter = { _id: id };
            const {password} = update;
            if(password){
                throw new Error("Oops!!! Admin Password cannot be updated by the superadmin");
            }
            //Update
            const updatedAdmin = Admin.findOneAndUpdate(filter, update, { new: true });
            if (updatedAdmin) {
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
    },
    // Activate Admin
    async activate(id: string) {
        try {

            //Set filter variable
            const filter = { _id: id };
            //Search for admin in database
            const admin = await Admin.findOne(filter);
            if (admin) {
                let { email, status, id } = admin;
                //Change Status
                status = "active";
                // admin["status"] = status;
                const token = jwt.sign({ status, id }, `${process.env.JWT_SECRET}`, {
                    expiresIn: '1d'
                })
                // const token = jwt.sign({...admin}, `${process.env.JWT_SECRET}`, {
                //     expiresIn: '30d'})
                const subject = `Admin Verification `
                const url = `${process.env.BASE_URL}/admin/verify?token=${token}`;
                //Send email to applicant
                const text = `<p>Click to be verified as an admin <a href=" http://${url}"> click here </a>.</p>`
                await emailService(email, subject, text)
                return admin;
            }



        } catch (error) {
            throw new Error(`${error}`);
        }


    },

    async verify(token: unknown) {
        try {
            if (token) {
                const decoded = jwt.verify(`${token}`, `${process.env.JWT_SECRET}`);
                if (decoded instanceof Object) {
                    const { status, id } = decoded;

                    //Set filter variable
                    const filter = { _id: id };
                    const update = { status }
                    const activatedAdmin = await Admin.findOneAndUpdate(filter, update, { new: true });
                    return activatedAdmin;
                }
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    },

    async deactivate(id: unknown) {
        try {
            if (id) {
                //Locate the admin and deactivate
                const filter = { _id: id };
                const update = { status: "inactive" };
                const deactivatedAdmin = await Admin.findOneAndUpdate(filter, update, { new: true });
                return deactivatedAdmin;
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    },

    async delete(id: unknown) {
        try {
            if (id) {
                //Find and delete
                const filter = { _id: id };
                const deletedAdmin = await Admin.findOneAndDelete(filter);
                return deletedAdmin;
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    },


    /* Stack Operations */
    //view all stacks
    async viewAllStack() {
        try {
            const stacks = await Stack.find({});
            return stacks;
        } catch (error) {
            throw new Error(`${error}`);
        }
    },
    //create a stack
    async addStack(data: Stack) {
        try {
            const stack = new Stack(data)
            await stack.save();
            return stack;
        } catch (error) {
            throw new Error(`${error}`);
        }

    },
    //edit a stack
    async editStack(id: unknown, update: Stack) {
        try {
            const stackToEdit = await Stack.findByIdAndUpdate(id,update,{new:true});
            return stackToEdit;
        } catch (error) {
            throw new Error(`${error}`);  
        }
        
    },
    //delete a stack
    async deleteStack(id: unknown) {
        try {
            const stackToDelete = await Stack.findByIdAndDelete(id);
            return stackToDelete;
        } catch (error) {
            throw new Error(`${error}`);
        }
    },
}








export default ADMIN;


