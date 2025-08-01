import { Router } from "express";
import appointmentsController from "../controllers/appointmentsController";
import validateDtoPostSchedule from "../middlewares/validateDtoPostSchedule";
import validateDtoId from "../middlewares/validateDtoId";
import auth from "../middlewares/auth";

const appointmentsRouter : Router = Router()

appointmentsRouter.get("/",/*auth,*/appointmentsController.getAppointments)
appointmentsRouter.post("/schedule",auth,validateDtoPostSchedule,appointmentsController.postAppointmentsSchedule)
appointmentsRouter.put("/cancel/:id",auth,validateDtoId,appointmentsController.putAppointmentsCancel)
appointmentsRouter.get("/:id"/*auth,*/,validateDtoId,appointmentsController.getAppointmentsById)

export default appointmentsRouter