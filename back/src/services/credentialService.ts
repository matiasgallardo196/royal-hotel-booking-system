import { EntityManager } from "typeorm";
import CredentialDto from "../dto/credentialDto";
import { Credential } from "../entities/Credential";
import hashUtils from "../utils/hashUtils";
import credentialRepository from "../repositories/credentialRepository";

export const validateCredential = async (
  validateCredentialData: CredentialDto
): Promise<number> => {
  const credentialInUse: Credential = await credentialRepository.findByUserName(
    validateCredentialData.username
  );
  if (
    !(await hashUtils.compare(
      validateCredentialData.password,
      credentialInUse.password
    ))
  )
    throw {
      error: "UserNotFound",
      message: "Incorrect username or password",
      status: 400,
    };

  return credentialInUse.id;
};

export const createCredentialService = async (
  createCredentialData: CredentialDto,
  entityManager: EntityManager
): Promise<Credential> => {
  createCredentialData.password = await hashUtils.hash(
    createCredentialData.password
  );
  const newCredential: Credential = await entityManager.create(
    Credential,
    createCredentialData
  );
  const resultNewCredential: Credential = await entityManager.save(
    newCredential
  );

  return resultNewCredential;
};
