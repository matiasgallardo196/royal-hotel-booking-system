import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";

const credentialRepository = AppDataSource.getRepository(Credential).extend({
    findByUserName: async function (username:string):Promise<Credential> {
        const credentialInUse:Credential | null= await this.findOne({
            where: { username: username },
            select: ["id", "password"] 
        });
        if (!credentialInUse) throw { 
            error: "UserNotFound",
            message: "Usuario o contraseña incorrectos", 
            status: 400 
        }
        return credentialInUse
    }
});


export default credentialRepository