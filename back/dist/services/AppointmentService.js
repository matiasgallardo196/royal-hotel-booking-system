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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putAppointmentsCancelService = exports.postAppointmentsScheduleService = exports.getAppointmentByIdService = exports.getAppointmentService = void 0;
const IAppointment_1 = require("../interfaces/IAppointment");
const appointmenRepository_1 = __importDefault(require("../repositories/appointmenRepository"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointments = yield appointmenRepository_1.default.find({ relations: { user: true } });
    if (!newAppointments)
        throw { error: "AppointmentsNotFound", message: "No se encontraron citas", status: 404 };
    return newAppointments;
});
exports.getAppointmentService = getAppointmentService;
const getAppointmentByIdService = (getAppointmentByIdServiceData) => __awaiter(void 0, void 0, void 0, function* () {
    return appointmenRepository_1.default.findAppointmentById(getAppointmentByIdServiceData);
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const postAppointmentsScheduleService = (postAppointmentsScheduleServiceData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository_1.default.findUsersById(postAppointmentsScheduleServiceData.userId);
    const newAppointment = yield appointmenRepository_1.default.create({
        date: postAppointmentsScheduleServiceData.date,
        time: postAppointmentsScheduleServiceData.time,
        user: user
    });
    const resultNewAppointment = yield appointmenRepository_1.default.save(newAppointment);
    return resultNewAppointment;
});
exports.postAppointmentsScheduleService = postAppointmentsScheduleService;
const putAppointmentsCancelService = (putAppointmentsCancelServiceData) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = yield appointmenRepository_1.default.findAppointmentById(putAppointmentsCancelServiceData);
    appointmenRepository_1.default.merge(newAppointment, { status: IAppointment_1.AppointmentStatus.Cancelled });
    yield appointmenRepository_1.default.save(newAppointment);
    return newAppointment;
});
exports.putAppointmentsCancelService = putAppointmentsCancelService;
