import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";





export const generateToken= (userId:number):string=>{
    if(!JWT_SECRET)throw new Error("No se ha definido un JWT_SECRET")
    return jwt.sign({userId},JWT_SECRET,{expiresIn:"1h"})
}


export const verifyToken=(token:string):any=>{
    try {
        if(!JWT_SECRET)throw new Error("No se ha definido un JWT_SECRET")
        return jwt.verify(token,JWT_SECRET)
    } catch (error) {
        return null
    }

}