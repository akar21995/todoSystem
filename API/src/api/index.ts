import { Router } from "express";
import taskRoutes from "../api/taskRoutes/taskRouter";
import csvRoutes from "../api/csvRoutes/csvRoutes";

const router = Router();

router.use("/task", taskRoutes);

router.use("/csv", csvRoutes);

export default router;