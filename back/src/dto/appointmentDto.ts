import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"


 export class AppointmentScheduleDto{
    @IsNotEmpty({ message: "La fecha no puede estar vacía" })
    @IsString({ message: "La fecha debe ser una cadena de texto" })
    date: string

    @IsNotEmpty({ message: "La hora no puede estar vacía" })
    @IsString({ message: "La hora debe ser una cadena de texto" })
    time: string

    @IsNotEmpty({ message: "El ID de usuario no puede estar vacío" })
    @IsNumber({}, { message: "El ID de usuario debe ser un número" })
    userId: number
    
}

export class AppointmentIdDto{
  @IsInt({message:"El ID debe ser un número entero"})
  @Min(1,{ message: "El ID debe ser mayor que 0" })
  id:number
}
