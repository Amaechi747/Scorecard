import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminSchema';
import Decadev from '../models/decadevSchema';




const User = {
    async verify(data: Idata){
        const {email, password} = data;
        const emailSubstring = email.split('@')[1];
        //Admin verification
       
        if(emailSubstring === "decagonhq.com"){
            const filter = {email}
            const isAdmin = await Admin.findOne(filter);

            if(isAdmin){
                //Get details
                const hashedPassword: any = isAdmin.password;
                if (await bcrypt.compare(password, hashedPassword)){ 
                    const {_id} = isAdmin; 
                    const token = this.generateToken(_id);
                    const admin = {
                        id: isAdmin._id,
                        firstName: isAdmin.firstName,
                        lastName: isAdmin.lastName,
                        email: isAdmin.email,
                        stack: isAdmin.stack,
                        role: isAdmin.role,
                        phoneNo: isAdmin.phoneNo,
                        squad: isAdmin.squad,
                        status: isAdmin.status
                    }
                    const data = {token, admin};
                    return data;
                }
                throw new Error('Invalid email or Password')
            }else{
                throw new Error('Invalid email or Password')
            }
        }

        // Decadev verification
        if(emailSubstring === "decagon.dev"){
            const filter = {email}
            const isDecadev = await Decadev.findOne(filter);
            console.log(isDecadev?.password)  
            if(isDecadev){
                const hashedPassword: any = isDecadev.password;
                if (await bcrypt.compare(password, hashedPassword)){ 
                    const {_id} = isDecadev; 
                    const token = this.generateToken(_id);
                    const decadevDetails = {
                        id: isDecadev._id,
                        firstName: isDecadev.firstName,
                        lastName: isDecadev.lastName,
                        email: isDecadev.email,
                        stack: isDecadev.stack,
                        phoneNo: isDecadev.phoneNo,
                        squad: isDecadev.squad,
                        status: isDecadev.status
                    }
                    const data = {token, decadevDetails};
                    return data;          
                }
                throw new Error('Invalid email or Password')
       
                    
            }else{
                throw new Error('Invalid email or Password')
            }
        }

        throw new Error('Oops!, Email must be a valid Decagon user email.');
    },


    async logout (){

    },


    // Generate Token
   generateToken (id: any){
        if(process.env.JWT_SECRET ){
           const token =  jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: '2d',
                })
            return token;
        }
      
    }



}



export default User;