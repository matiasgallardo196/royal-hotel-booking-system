import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppointmentScheduleDto } from "../dto/appointmentDto";

const validateDtoPostSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const appointmentDto = plainToInstance(AppointmentScheduleDto, req.body);
  const errors = await validate(appointmentDto, {
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

export default validateDtoPostSchedule;
