import { Router } from "express";
import {
  createTaskHandler,
  getTasksHandler,
  getTaskByIdHandler,
  updateTaskHandler,
  patchTaskHandler,
  deleteTaskHandler,
} from "../controllers/task.controller";

const router = Router();

router.post("/", createTaskHandler);
router.get("/", getTasksHandler);
router.get("/:task_id", getTaskByIdHandler);
router.put("/:task_id", updateTaskHandler);
router.patch("/:task_id", patchTaskHandler);
router.delete("/:task_id", deleteTaskHandler);

export default router;

