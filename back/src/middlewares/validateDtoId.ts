import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { AppointmentIdDto } from "../dto/appointmentDto";
import { validate } from "class-validator";

const validateDtoId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const iDDto = plainToInstance(AppointmentIdDto, {
    id: Number(req.params.id),
  });
  const errors = await validate(iDDto);
  if (errors.length > 0) {
    next({
      status: 400,
      error: "Invalid ID",
      message: "The provided ID is not valid",
      details: errors.map((err: any) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }

  next();
};

export default validateDtoId;
