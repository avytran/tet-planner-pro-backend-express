import { Router } from "express";
import {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  patchTaskController,
  deleteTaskController,
} from "../controllers/task.controller";
import validate from "../middlewares/validate.mdw";
import { creatingTaskAjvSchema, updatingTaskAjvSchema, patchingTaskAjvSchema } from "../entities/task.entity";

const router = Router();

router.post("/", validate(creatingTaskAjvSchema), createTaskController);
router.get("/", getTasksController);
router.get("/:id", getTaskByIdController);
router.put("/:id", validate(updatingTaskAjvSchema), updateTaskController);
router.patch("/:id", validate(patchingTaskAjvSchema), patchTaskController);
router.delete("/:id", deleteTaskController);

export default router;

