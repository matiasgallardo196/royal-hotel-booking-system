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
const Appointment_1 = require("../entities/Appointment");
const data_source_1 = require("../config/data-source");
const appointmenRepository = data_source_1.AppDataSource.getRepository(Appointment_1.Appointment).extend({
    findAppointmentById: function (appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAppointment = yield appointmenRepository.findOne({
                where: { id: appointmentId },
                relations: ["user"]
            });
            if (!newAppointment)
                throw {
                    error: "AppointmentNotFound",
                    message: `No se encontró la cita con ID ${appointmentId}`,
                    status: 404
                };
            return newAppointment;
        });
    }
});
exports.default = appointmenRepository;
