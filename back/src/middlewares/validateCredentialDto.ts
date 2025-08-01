import { plainToInstance } from "class-transformer";
import { NextFunction,Request,Response } from "express";
import CredentialDto from "../dto/CredentialDto";
import { validate } from "class-validator";



const validateCredentialDto=async(req:Request,res:Response,next:NextFunction)=>{
    const credentials= plainToInstance(CredentialDto,req.body)
    const errors= await validate(credentials, { whitelist: true, forbidNonWhitelisted: true })

    if(errors.length>0){
        next({
            status: 400,
            error: "BadRequest",
            message: "Los datos proporcionados no son válidos",
            details: errors.map(err => ({
                property: err.property,
                constraints: err.constraints
            }))
        })
    }
    next()
}

export default validateCredentialDto