import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "../config/envs";

const saltRounds : number=Number(SALT_ROUNDS);

const hashUtils={
    async  hash (password:string):Promise<string>{
        const salt:string= await bcrypt.genSalt(saltRounds)
        return bcrypt.hash(password,salt)
    },


    async  compare(password:string,hash:string):Promise<boolean>{
        return bcrypt.compare(password,hash);
    }


}


export default hashUtils