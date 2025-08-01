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
exports.createCredentialService = exports.validateCredential = void 0;
const Credential_1 = require("../entities/Credential");
const hashUtils_1 = __importDefault(require("../utils/hashUtils"));
const credentialRepository_1 = __importDefault(require("../repositories/credentialRepository"));
const validateCredential = (validateCredentialData) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialInUse = yield credentialRepository_1.default.findByUserName(validateCredentialData.username);
    if (!(yield hashUtils_1.default.compare(validateCredentialData.password, credentialInUse.password)))
        throw { error: "UserNotFound", message: "Usuario o contraseña incorrectos", status: 400 };
    return credentialInUse.id;
});
exports.validateCredential = validateCredential;
const createCredentialService = (createCredentialData, entityManager) => __awaiter(void 0, void 0, void 0, function* () {
    createCredentialData.password = yield hashUtils_1.default.hash(createCredentialData.password);
    const newCredential = yield entityManager.create(Credential_1.Credential, createCredentialData);
    const resultNewCredential = yield entityManager.save(newCredential);
    return resultNewCredential;
});
exports.createCredentialService = createCredentialService;
