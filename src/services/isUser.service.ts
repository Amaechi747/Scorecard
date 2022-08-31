import Admin from '../models/adminSchema';
import Decadev from '../models/decadevSchema';


const isUser = async function(email: string){
    console.log(email)
        const emailSubstring = email.split('@')[1];
        //Admin verification
       
        if(emailSubstring === "decagonhq.com"){
            const filter = {email}
            const isAdmin = await Admin.findOne(filter);
            if(isAdmin){
                //Get details
                    return isAdmin;
                }
                throw new Error('Invalid User')
        }

        if(emailSubstring === "decagon.dev"){
            const filter = {email: email}
            const isDecadev = await Decadev.findOne(filter);
            if(isDecadev){
                //Get details
                    return isDecadev;
                }
                throw new Error('Invalid User')
        }
       
        
};
       
export default isUser;
