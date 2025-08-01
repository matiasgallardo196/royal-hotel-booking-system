import { IsNotEmpty, IsString } from "class-validator"

class CredentialDto {
    @IsString({ message: "El usuario debe ser una cadena de texto" })
    @IsNotEmpty({ message: "El nombre de usuario no puede estar vacío" })
    username:string

    @IsString({ message: "La contraseña debe ser una cadena de texto" })
    @IsNotEmpty({ message: "La contraseña no puede estar vacía" })
    password: string
}

export default CredentialDto

