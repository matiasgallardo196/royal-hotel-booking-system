import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

class UserDto {
  @IsNotEmpty({ message: "Name cannot be empty" })
  @IsString({ message: "Name cannot be empty" })
  name: string;

  @IsNotEmpty({ message: "Email cannot be empty" })
  @IsString({ message: "Email must be a string" })
  @IsEmail({}, { message: "Email must be valid" })
  email: string;

  @IsNotEmpty({ message: "Birth date cannot be empty" })
  @IsDate({ message: "Birth date must be a valid date" })
  birthdate: Date;

  @IsNotEmpty({ message: "ID number cannot be empty" })
  @IsNumber({}, { message: "ID number must be a number" })
  nDni: number;

  @IsNotEmpty({ message: "Password cannot be empty" })
  @IsString({ message: "Password must be a string" })
  password: string;

  @IsOptional()
  @IsString({ message: "File must be a string" })
  file?: string | null;
}

export default UserDto;
