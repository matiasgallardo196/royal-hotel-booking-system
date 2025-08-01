import { Request,Response,NextFunction } from "express";
import { verifyToken } from "../utils/authUtils";

const auth=(req:Request,res:Response,next:NextFunction):void=>{

    const token = req.headers.authorization?.split(" ")[1]

    if(!token){
        res.status(401).json({message:"Acceso no autorizado"})
        return 
    }
    
    const decoded= verifyToken(token)

    if(!decoded){
        res.status(401).json({message:"Token inválido o expirado"})
        return 
    }
  
    next()
}

export default auth

