import { Request, Response } from "express";
import {
  getAppointmentByIdService,
  getAppointmentService,
  postAppointmentsScheduleService,
  putAppointmentsCancelService,
} from "../services/AppointmentService";
import { Appointment } from "../entities/Appointment";
import { catchAsync } from "../utils/catchAsync";
import { AppointmentScheduleDto } from "../dto/appointmentDto";

const getAppointments = async (req: Request, res: Response) => {
  const newAppointments: Appointment[] = await getAppointmentService();
  res.status(200).json(newAppointments);
};

const postAppointmentsSchedule = async (req: Request, res: Response) => {
  const postAppointmentsScheduleData: AppointmentScheduleDto = req.body;
  const newAppointment: Appointment = await postAppointmentsScheduleService(
    postAppointmentsScheduleData
  );
  res.status(201).json(newAppointment);
};

const putAppointmentsCancel = async (req: Request, res: Response) => {
  const idCancel: number = Number(req.params.id);
  const appointmentCancelled: Appointment = await putAppointmentsCancelService(
    idCancel
  );
  res.status(200).json(appointmentCancelled);
};

const getAppointmentsById = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const newAppointmentById = await getAppointmentByIdService(id);
  res.status(200).json(newAppointmentById);
};

const appointmentsController = {
  getAppointments: catchAsync(getAppointments),
  postAppointmentsSchedule: catchAsync(postAppointmentsSchedule),
  putAppointmentsCancel: catchAsync(putAppointmentsCancel),
  getAppointmentsById: catchAsync(getAppointmentsById),
};

export default appointmentsController;
