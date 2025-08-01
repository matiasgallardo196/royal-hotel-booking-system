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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AppointmentDto_1 = require("../dto/AppointmentDto");
const validateDtoPostSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentDto = (0, class_transformer_1.plainToInstance)(AppointmentDto_1.AppointmentScheduleDto, req.body);
    const errors = yield (0, class_validator_1.validate)(appointmentDto, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length > 0) {
        next({
            status: 400,
            error: "BadRequest",
            message: "Los datos proporcionados no son válidos",
            details: errors.map(err => ({
                property: err.property,
                constraints: err.constraints
            }))
        });
    }
    next();
});
exports.default = validateDtoPostSchedule;
