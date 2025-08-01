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
const User_1 = require("../entities/User");
const data_source_1 = require("../config/data-source");
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User).extend({
    findUsersById: function (idData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUsersById = yield this.findOne({
                where: { id: idData },
                relations: ["appointments"]
            });
            if (!newUsersById)
                throw {
                    error: "UserNotFound",
                    message: `No se encontró el usuario con ID ${idData}`,
                    status: 400
                };
            return newUsersById;
        });
    }
});
exports.default = userRepository;
