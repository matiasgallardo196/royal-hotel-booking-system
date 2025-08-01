import { User } from "../entities/User";
import { AppDataSource } from "../config/data-source";

const userRepository = AppDataSource.getRepository(User).extend({
    findUsersById : async function (idData:number): Promise<User>{
        const newUsersById:User|null=await this.findOne({
            where: { id: idData },
            relations: ["appointments"]
        })
        if (!newUsersById) throw {
                error: "UserNotFound",
                message: `No se encontró el usuario con ID ${idData}`,
                status: 400
            };
        
        return newUsersById;
        
    }
})


export default userRepository
