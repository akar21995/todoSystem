import express from "express";
import taskController from "./task.controller";

const router = express.Router();

router.get("/", taskController.getAllTasks);

router.get("/:taskId", taskController.getTaskByTaskId);

router.post("/create", taskController.createTask);

router.put("/:taskId", taskController.updateTask);

router.delete("/:taskId", taskController.deleteTask);

router.get("/taskList/filter", taskController.getTaskByFilter);

export default router;
