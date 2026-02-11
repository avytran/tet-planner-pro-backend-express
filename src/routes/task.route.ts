import { Router } from "express";
import {
  createTaskHandler,
  getTasksHandler,
  getTaskByIdHandler,
} from "../controllers/task.controller";

const router = Router();

router.post("/", createTaskHandler);
router.get("/", getTasksHandler);
router.get("/:task_id", getTaskByIdHandler);

export default router;

