import { Request, Response } from "express";
import {
  getUsersByIdService,
  getUsersService,
  postUsersLoginService,
  postUsersRegisterService,
} from "../services/usersService";
import { User } from "../entities/User";
import { catchAsync } from "../utils/catchAsync";
import { ILogin } from "../interfaces/ILogin";
import CredentialDto from "../dto/credentialDto";

const getUsers = async (req: Request, res: Response) => {
  const newUsers: User[] = await getUsersService();
  res.status(200).json(newUsers);
};

const postUsersRegister = async (req: Request, res: Response) => {
  const { name, email, birthdate, nDni, password, file } = req.body;
  const newUser: User = await postUsersRegisterService({
    name,
    email,
    birthdate,
    nDni,
    password,
    file,
  });
  res.status(201).json(newUser);
};

const postUsersLogin = async (req: Request, res: Response) => {
  const userData: CredentialDto = req.body;
  const login: ILogin = await postUsersLoginService(userData);
  res.status(200).json(login);
};

const getUsersById = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const newUserById = await getUsersByIdService(id);
  res.status(200).json(newUserById);
};

const userController = {
  getUsers: catchAsync(getUsers),
  postUsersRegister: catchAsync(postUsersRegister),
  postUsersLogin: catchAsync(postUsersLogin),
  getUsersById: catchAsync(getUsersById),
};

export default userController;
