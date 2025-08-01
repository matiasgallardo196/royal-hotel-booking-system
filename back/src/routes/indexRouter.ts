import { Router } from "express";
import moviesRouter from "./userRouter";
import appointmentsRouter from "./appointmentsRouter";

const router: Router=Router()


router.use("/users",moviesRouter)
router.use("/appointments",appointmentsRouter)

export default router