import { AppDataSource } from "../config/data-source";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";
import {
  createCredentialService,
  validateCredential,
} from "./credentialService";
import { Credential } from "../entities/Credential";
import CredentialDto from "../dto/CredentialDto";
import { ILogin } from "../interfaces/ILogin";
import userRepository from "../repositories/userRepository";
import { generateToken } from "../utils/authUtils";
import { sender } from "../utils/mailSender";

export const getUsersService = async (): Promise<User[]> => {
  const newUsers: User[] = await userRepository.find();
  return newUsers;
};

export const postUsersRegisterService = async (
  userData: UserDto
): Promise<User> => {
  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const credentials: Credential = await createCredentialService(
      { username: userData.email, password: userData.password },
      queryRunner.manager
    );

    const newUser: User = await queryRunner.manager.create(User, {
      name: userData.name,
      email: userData.email,
      birthdate: userData.birthdate,
      nDni: userData.nDni,
      file: userData.file,
      credentials,
    });

    const resultnewUser: User = await queryRunner.manager.save(newUser);

    const returnedresultnewUser = await queryRunner.manager.findOne(User, {
      where: { id: resultnewUser.id },
      relations: ["credentials"],
    });

    if (!returnedresultnewUser)
      throw new Error("Could not retrieve user after creation.");

    await queryRunner.commitTransaction();
    await sender(
      returnedresultnewUser.email,
      "Welcome",
      `<h2>Hello ${returnedresultnewUser.name} 👋</h2><p>Thank you for registering.</p>`
    );
    return returnedresultnewUser;
  } catch (error) {
    console.error("Transaction failed:", error);
    await queryRunner.rollbackTransaction();

    await queryRunner.query(`
                SELECT setval(pg_get_serial_sequence('credential', 'id'), 
                    COALESCE((SELECT MAX(id) FROM credential), 0) + 1, false);
            `);

    throw {
      error: "UserCreationFailed",
      message: "Error registering user",
      status: 400,
    };
  } finally {
    await queryRunner.release();
  }
};

export const getUsersByIdService = async (
  getUsersByIdServiceData: number
): Promise<User | null> => {
  return userRepository.findUsersById(getUsersByIdServiceData);
};

export const postUsersLoginService = async (
  CredentialDtoData: CredentialDto
) => {
  const loginId = await validateCredential(CredentialDtoData);
  const userLogin: User | null = loginId
    ? await userRepository.findOne({ where: { credentials: { id: loginId } } })
    : null;
  const token = generateToken(loginId);

  const resultLogin: ILogin = {
    login: Boolean(loginId),
    user: userLogin ? userLogin : null,
    token: token ? token : null,
  };

  return resultLogin;
};

///Function to validate middleware
export const validateUsernameForAppointment = async (
  validateUsernameForAppointmentData: number
): Promise<boolean> => {
  const userExists: User | null = await userRepository.findOneBy({
    id: validateUsernameForAppointmentData,
  });

  return userExists ? true : false;
};
