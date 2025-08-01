import express, { Application,Request, Response, NextFunction } from 'express';
import router from './routes/indexRouter';
import morgan from "morgan"
import cors from "cors"
import { ENVIRONMENT } from './config/envs';

const server: Application= express()

server.use(morgan("dev"))
server.use(cors())
server.use(express.json())

//if(!ENVIRONMENT)app.use(helmet())
//if(!ENVIRONMENT)app.use(limiter)


server.use(router)

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if(ENVIRONMENT){res.status(err.status  || 500).json({
        error: err.error || "UnknownError",
        message: err.message || "Ocurrió un error inesperado",
        details: err.details
    });}else{
        res.status(err.status  || 500).json({
            error: err.error || "UnknownError",
            message: err.message || "Ocurrió un error inesperado"
        });
    }
    
});

export default server;