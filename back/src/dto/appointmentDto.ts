import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class AppointmentScheduleDto {
  @IsNotEmpty({ message: "Date cannot be empty" })
  @IsString({ message: "Date must be a string" })
  date: string;

  @IsNotEmpty({ message: "Time cannot be empty" })
  @IsString({ message: "Time must be a string" })
  time: string;

  @IsNotEmpty({ message: "User ID cannot be empty" })
  @IsNumber({}, { message: "User ID must be a number" })
  userId: number;
}

export class AppointmentIdDto {
  @IsInt({ message: "ID must be an integer" })
  @Min(1, { message: "ID must be greater than 0" })
  id: number;
}
