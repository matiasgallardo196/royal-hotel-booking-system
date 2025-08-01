"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppointmentService_1 = require("../services/AppointmentService");
const catchAsync_1 = require("../utils/catchAsync");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointments = yield (0, AppointmentService_1.getAppointmentService)();
    res.status(200).json(newAppointments);
});
const postAppointmentsSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postAppointmentsScheduleData = req.body;
    const newAppointment = yield (0, AppointmentService_1.postAppointmentsScheduleService)(postAppointmentsScheduleData);
    res.status(201).json(newAppointment);
});
const putAppointmentsCancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCancel = Number(req.params.id);
    const appointmentCancelled = yield (0, AppointmentService_1.putAppointmentsCancelService)(idCancel);
    res.status(200).json(appointmentCancelled);
});
const getAppointmentsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const newAppointmentById = yield (0, AppointmentService_1.getAppointmentByIdService)(id);
    res.status(200).json(newAppointmentById);
});
const appointmentsController = {
    getAppointments: (0, catchAsync_1.catchAsync)(getAppointments),
    postAppointmentsSchedule: (0, catchAsync_1.catchAsync)(postAppointmentsSchedule),
    putAppointmentsCancel: (0, catchAsync_1.catchAsync)(putAppointmentsCancel),
    getAppointmentsById: (0, catchAsync_1.catchAsync)(getAppointmentsById),
};
exports.default = appointmentsController;
