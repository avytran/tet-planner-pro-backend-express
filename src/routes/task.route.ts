import { Router } from "express";
import {
  createTaskHandler,
  getTasksHandler,
  getTaskByIdHandler,
  updateTaskHandler,
} from "../controllers/task.controller";

const router = Router();

router.post("/", createTaskHandler);
router.get("/", getTasksHandler);
router.get("/:task_id", getTaskByIdHandler);
router.put("/:task_id", updateTaskHandler);

export default router;

