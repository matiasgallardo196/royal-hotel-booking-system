import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import UserDto from "../dto/UserDto";
import { validate } from "class-validator";

const validateUserDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.birthdate) {
    req.body.birthdate = new Date(req.body.birthdate);
  }

  const userData = plainToInstance(UserDto, req.body);
  const errors = await validate(userData, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    next({
      status: 400,
      error: "BadRequest",
      message: "The provided data is not valid",
      details: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }
  next();
};

export default validateUserDto;
