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
const class_validator_1 = require("class-validator");
class UserDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El email no puede estar vacío" }),
    (0, class_validator_1.IsString)({ message: "El nombre no puede estar vacío" }),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El email no puede estar vacío" }),
    (0, class_validator_1.IsString)({ message: "El email debe ser una cadena de texto" }),
    (0, class_validator_1.IsEmail)({}, { message: "El email debe ser válido" }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "La fecha de nacimiento no puede estar vacía" }),
    (0, class_validator_1.IsDate)({ message: "La fecha de nacimiento debe ser una fecha válida" }),
    __metadata("design:type", Date)
], UserDto.prototype, "birthdate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El DNI no puede estar vacío" }),
    (0, class_validator_1.IsNumber)({}, { message: "El DNI debe ser un número" }),
    __metadata("design:type", Number)
], UserDto.prototype, "nDni", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "La contraseña no puede estar vacía" }),
    (0, class_validator_1.IsString)({ message: "La contraseña debe ser una cadena de texto" }),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
exports.default = UserDto;
