import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import CredentialDto from "../dto/credentialDto";
import { validate } from "class-validator";

const validateCredentialDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const credentials = plainToInstance(CredentialDto, req.body);
  const errors = await validate(credentials, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    next({
      status: 400,
      error: "BadRequest",
      message: "The provided data is not valid",
      details: errors.map((err: any) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }
  next();
};

export default validateCredentialDto;
