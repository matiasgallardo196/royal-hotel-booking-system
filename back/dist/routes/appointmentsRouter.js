"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = __importDefault(require("../controllers/appointmentsController"));
const validateDtoPostSchedule_1 = __importDefault(require("../middlewares/validateDtoPostSchedule"));
const validateDtoId_1 = __importDefault(require("../middlewares/validateDtoId"));
const appointmentsRouter = (0, express_1.Router)();
appointmentsRouter.get("/", appointmentsController_1.default.getAppointments);
appointmentsRouter.post("/schedule", validateDtoPostSchedule_1.default, appointmentsController_1.default.postAppointmentsSchedule);
appointmentsRouter.put("/cancel/:id", validateDtoId_1.default, appointmentsController_1.default.putAppointmentsCancel);
appointmentsRouter.get("/:id", validateDtoId_1.default, appointmentsController_1.default.getAppointmentsById);
exports.default = appointmentsRouter;
