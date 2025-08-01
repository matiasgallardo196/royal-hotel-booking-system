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
exports.validateUsernameForAppointment = exports.postUsersLoginService = exports.getUsersByIdService = exports.postUsersRegisterService = exports.getUsersService = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const credentialService_1 = require("./credentialService");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const authUtils_1 = require("../utils/authUtils");
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const newUsers = yield userRepository_1.default.find();
    return newUsers;
});
exports.getUsersService = getUsersService;
const postUsersRegisterService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    try {
        const credentials = yield (0, credentialService_1.createCredentialService)({ username: userData.email, password: userData.password }, queryRunner.manager);
        const newUser = yield queryRunner.manager.create(User_1.User, {
            name: userData.name,
            email: userData.email,
            birthdate: userData.birthdate,
            nDni: userData.nDni,
            credentials
        });
        const resultnewUser = yield queryRunner.manager.save(newUser);
        if (!resultnewUser) {
            throw new Error("Error al registrar el usuario");
        }
        yield queryRunner.commitTransaction();
        return resultnewUser;
    }
    catch (error) {
        console.error("Fallo en la transacción:", error);
        yield queryRunner.rollbackTransaction(); // { error: "UserCreationFailed", message: "Error al registrar el usuario", status: 400 }
        yield queryRunner.query(`
                SELECT setval(pg_get_serial_sequence('credential', 'id'), 
                    COALESCE((SELECT MAX(id) FROM credential), 0) + 1, false);
            `);
        throw { error: "UserCreationFailed", message: "Error al registrar el usuario", status: 400 };
    }
    finally {
        yield queryRunner.release(); // 🔄 Cerramos la conexión del QueryRunner
    }
});
exports.postUsersRegisterService = postUsersRegisterService;
const getUsersByIdService = (getUsersByIdServiceData) => __awaiter(void 0, void 0, void 0, function* () {
    return userRepository_1.default.findUsersById(getUsersByIdServiceData);
});
exports.getUsersByIdService = getUsersByIdService;
const postUsersLoginService = (CredentialDtoData) => __awaiter(void 0, void 0, void 0, function* () {
    const loginId = yield (0, credentialService_1.validateCredential)(CredentialDtoData);
    const userLogin = loginId ? yield userRepository_1.default.findOne({ where: { credentials: { id: loginId } } }) : null;
    const token = (0, authUtils_1.generateToken)(loginId);
    const resultLogin = {
        login: Boolean(loginId),
        user: userLogin ? userLogin : null,
        token: token ? token : null
    };
    return resultLogin;
});
exports.postUsersLoginService = postUsersLoginService;
///Funcion para validar middleWare
const validateUsernameForAppointment = (validateUsernameForAppointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield userRepository_1.default.findOneBy({ id: validateUsernameForAppointmentData });
    return userExists ? true : false;
});
exports.validateUsernameForAppointment = validateUsernameForAppointment;
