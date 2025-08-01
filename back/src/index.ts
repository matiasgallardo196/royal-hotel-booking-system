import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";


AppDataSource.initialize().then(res=>{
    console.log(" bd conectada todo piola :) ")
    server.listen(PORT,()=>{
        console.log(`server en Port ${PORT}`)
    })
})
