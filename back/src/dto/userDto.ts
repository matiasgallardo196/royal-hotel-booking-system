import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

class UserDto{
    @IsNotEmpty({ message: "El email no puede estar vacío" })
    @IsString({ message: "El nombre no puede estar vacío" })
    name:string

    @IsNotEmpty({ message: "El email no puede estar vacío" })
    @IsString({ message: "El email debe ser una cadena de texto" })
    @IsEmail({}, { message: "El email debe ser válido" })
    email:string
    
    @IsNotEmpty({ message: "La fecha de nacimiento no puede estar vacía" })
    @IsDate({ message: "La fecha de nacimiento debe ser una fecha válida" })
    birthdate:Date
    
    @IsNotEmpty({ message: "El DNI no puede estar vacío" })
    @IsNumber({}, { message: "El DNI debe ser un número" })
    nDni:number
    
    @IsNotEmpty({ message: "La contraseña no puede estar vacía" })
    @IsString({ message: "La contraseña debe ser una cadena de texto" })
    password:string

    @IsOptional()
    @IsString({ message: "El archivo debe ser una cadena de texto" })
    file?: string | null;
}

export default UserDto