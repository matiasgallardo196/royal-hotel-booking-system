import  {AppointmentScheduleDto}  from "../dto/AppointmentDto"
import { Appointment } from "../entities/Appointment";
import {AppointmentStatus} from "../interfaces/IAppointment"
import { User } from "../entities/User";
import appointmenRepository from "../repositories/appointmenRepository";
import userRepository from "../repositories/userRepository";
import { sender } from "../utils/mailSender";


export const getAppointmentService=async():Promise<Appointment[]>=>{
    const newAppointments:Appointment[]= await appointmenRepository.find({relations:{user:true}})
    if(!newAppointments) throw {error: "AppointmentsNotFound",message: "No se encontraron citas",status: 404};
    return newAppointments

}

export const getAppointmentByIdService=async(getAppointmentByIdServiceData:number):Promise<Appointment>=>{
   
    return appointmenRepository.findAppointmentById(getAppointmentByIdServiceData)
}

export const postAppointmentsScheduleService=async(postAppointmentsScheduleServiceData:AppointmentScheduleDto):Promise<Appointment>=>{
    
    const user:User=await userRepository.findUsersById(postAppointmentsScheduleServiceData.userId)
        
    const newAppointment:Appointment= await appointmenRepository.create({
        date:postAppointmentsScheduleServiceData.date,
        time:postAppointmentsScheduleServiceData.time,
        user:user})
    const resultNewAppointment:Appointment= await appointmenRepository.save(newAppointment)

    await sender(newAppointment.user.email,
                    "Turno Creado",
                    `<h2>Hola el turno se creo con exito para el dia 
                    ${newAppointment.date} a las ${newAppointment.time}
                     👋</h2><p>Gracias por agendar.</p>`
            )

    return resultNewAppointment
}

export const putAppointmentsCancelService=async(putAppointmentsCancelServiceData:number):Promise<Appointment>=>{
    const newAppointment:Appointment= await appointmenRepository.findAppointmentById(putAppointmentsCancelServiceData)
    
    appointmenRepository.merge(newAppointment, {status:AppointmentStatus.Cancelled});
    await appointmenRepository.save(newAppointment)

    await sender(newAppointment.user.email,
        "Turno Cancelado",
        `<h2>Hola el turno se cancelo con exito para el dia 
        ${newAppointment.date} a las ${newAppointment.time}
         👋</h2><p>Gracias por Cancelar con anticipacion.</p>`
)

    return newAppointment
    

}