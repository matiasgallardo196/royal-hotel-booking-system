"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentIdDto = exports.AppointmentScheduleDto = void 0;
const class_validator_1 = require("class-validator");
class AppointmentScheduleDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "La fecha no puede estar vacía" }),
    (0, class_validator_1.IsString)({ message: "La fecha debe ser una cadena de texto" }),
    __metadata("design:type", String)
], AppointmentScheduleDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "La hora no puede estar vacía" }),
    (0, class_validator_1.IsString)({ message: "La hora debe ser una cadena de texto" }),
    __metadata("design:type", String)
], AppointmentScheduleDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El ID de usuario no puede estar vacío" }),
    (0, class_validator_1.IsNumber)({}, { message: "El ID de usuario debe ser un número" }),
    __metadata("design:type", Number)
], AppointmentScheduleDto.prototype, "userId", void 0);
exports.AppointmentScheduleDto = AppointmentScheduleDto;
class AppointmentIdDto {
}
__decorate([
    (0, class_validator_1.IsInt)({ message: "El ID debe ser un número entero" }),
    (0, class_validator_1.Min)(1, { message: "El ID debe ser mayor que 0" }),
    __metadata("design:type", Number)
], AppointmentIdDto.prototype, "id", void 0);
exports.AppointmentIdDto = AppointmentIdDto;
