"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authUtils_1 = require("../utils/authUtils");
const auth = (req, res, next) => {
    var _a;
    console.log(req);
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Acceso no autorizado" });
        return;
    }
    const decoded = (0, authUtils_1.verifyToken)(token);
    if (!decoded) {
        console.log("paso por el middlewares");
        res.status(401).json({ message: "Token inválido o expirado" });
        return;
    }
    req.user = decoded;
    //console.log(req.user)
    next();
};
exports.default = auth;
