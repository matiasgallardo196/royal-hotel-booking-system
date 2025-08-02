import { Router } from "express";
import auth from "../middlewares/auth";
import userController from "../controllers/userController";
import validateCredentialDto from "../middlewares/validateCredentialDto";
import validateUserDto from "../middlewares/validateUserDto";
import validateDtoId from "../middlewares/validateDtoId";

const moviesRouter: Router = Router()

moviesRouter.get("/"/*auth,*/,userController.getUsers)
moviesRouter.post("/register",validateUserDto,userController.postUsersRegister)
moviesRouter.post("/login",validateCredentialDto,userController.postUsersLogin)// verificar si unir middlewares o cambiar orden
moviesRouter.get("/:id",auth,validateDtoId,userController.getUsersById) 

export default moviesRouter