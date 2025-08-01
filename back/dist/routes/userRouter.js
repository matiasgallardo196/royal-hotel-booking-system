"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const userController_1 = __importDefault(require("../controllers/userController"));
const validateCredentialDto_1 = __importDefault(require("../middlewares/validateCredentialDto"));
const validateUserDto_1 = __importDefault(require("../middlewares/validateUserDto"));
const validateDtoId_1 = __importDefault(require("../middlewares/validateDtoId"));
const moviesRouter = (0, express_1.Router)();
moviesRouter.get("/", auth_1.default, userController_1.default.getUsers);
moviesRouter.post("/register", validateUserDto_1.default, userController_1.default.postUsersRegister);
moviesRouter.post("/login", validateCredentialDto_1.default, userController_1.default.postUsersLogin); // verificar si unir middlewares o cambiar orden
moviesRouter.get("/:id", validateDtoId_1.default, userController_1.default.getUsersById);
exports.default = moviesRouter;
