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
const usersService_1 = require("../services/usersService");
const catchAsync_1 = require("../utils/catchAsync");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUsers = yield (0, usersService_1.getUsersService)();
    res.status(200).json(newUsers);
});
const postUsersRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, nDni, password } = req.body;
    const newUser = yield (0, usersService_1.postUsersRegisterService)({ name, email, birthdate, nDni, password });
    res.status(201).json(newUser);
});
const postUsersLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const login = yield (0, usersService_1.postUsersLoginService)(userData);
    res.status(200).json(login);
});
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const newUserById = yield (0, usersService_1.getUsersByIdService)(id);
    res.status(200).json(newUserById);
});
const userController = {
    getUsers: (0, catchAsync_1.catchAsync)(getUsers),
    postUsersRegister: (0, catchAsync_1.catchAsync)(postUsersRegister),
    postUsersLogin: (0, catchAsync_1.catchAsync)(postUsersLogin),
    getUsersById: (0, catchAsync_1.catchAsync)(getUsersById),
};
exports.default = userController;
