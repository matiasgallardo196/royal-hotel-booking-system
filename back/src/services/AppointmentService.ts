import { AppointmentScheduleDto } from "../dto/appointmentDto";
import { Appointment } from "../entities/Appointment";
import { AppointmentStatus } from "../interfaces/IAppointment";
import { User } from "../entities/User";
import appointmenRepository from "../repositories/appointmenRepository";
import userRepository from "../repositories/userRepository";
import { sender } from "../utils/mailSender";

export const getAppointmentService = async (): Promise<Appointment[]> => {
  const newAppointments: Appointment[] = await appointmenRepository.find({
    relations: { user: true },
  });
  if (!newAppointments)
    throw {
      error: "AppointmentsNotFound",
      message: "No appointments found",
      status: 404,
    };
  return newAppointments;
};

export const getAppointmentByIdService = async (
  getAppointmentByIdServiceData: number
): Promise<Appointment> => {
  return appointmenRepository.findAppointmentById(
    getAppointmentByIdServiceData
  );
};

export const postAppointmentsScheduleService = async (
  postAppointmentsScheduleServiceData: AppointmentScheduleDto
): Promise<Appointment> => {
  const user: User = await userRepository.findUsersById(
    postAppointmentsScheduleServiceData.userId
  );

  const newAppointment: Appointment = await appointmenRepository.create({
    date: postAppointmentsScheduleServiceData.date,
    time: postAppointmentsScheduleServiceData.time,
    user: user,
  });
  const resultNewAppointment: Appointment = await appointmenRepository.save(
    newAppointment
  );

  await sender(
    newAppointment.user.email,
    "Appointment Created",
    `<h2>Hello, your appointment was successfully created for 
                    ${newAppointment.date} at ${newAppointment.time}
                     👋</h2><p>Thank you for scheduling.</p>`
  );

  return resultNewAppointment;
};

export const putAppointmentsCancelService = async (
  putAppointmentsCancelServiceData: number
): Promise<Appointment> => {
  const newAppointment: Appointment =
    await appointmenRepository.findAppointmentById(
      putAppointmentsCancelServiceData
    );

  appointmenRepository.merge(newAppointment, {
    status: AppointmentStatus.Cancelled,
  });
  await appointmenRepository.save(newAppointment);

  await sender(
    newAppointment.user.email,
    "Appointment Cancelled",
    `<h2>Hello, your appointment was successfully cancelled for 
        ${newAppointment.date} at ${newAppointment.time}
         👋</h2><p>Thank you for cancelling in advance.</p>`
  );

  return newAppointment;
};
