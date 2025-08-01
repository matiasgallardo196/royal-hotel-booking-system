import { Appointment } from "../entities/Appointment";
import { AppDataSource } from "../config/data-source";

const appointmenRepository = AppDataSource.getRepository(Appointment).extend({
    findAppointmentById : async function(appointmentId:number){
        const newAppointment:Appointment|null= await appointmenRepository.findOne({
            where :{id:appointmentId},
        relations:["user"]})
        if(!newAppointment)throw {
            error: "AppointmentNotFound",
            message: `No se encontró la cita con ID ${appointmentId}`,
            status: 404
        }
        return newAppointment
    }

});

export default appointmenRepository