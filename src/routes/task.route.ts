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
import { mockAuth } from "../middlewares/mockAuth.mdw";

const router = Router();

router.post("/", mockAuth, validate(creatingTaskAjvSchema), createTaskController);
router.get("/", mockAuth, getTasksController);
router.get("/:id", mockAuth, getTaskByIdController);
router.put("/:id", mockAuth, validate(updatingTaskAjvSchema), updateTaskController);
router.patch("/:id", mockAuth, validate(patchingTaskAjvSchema), patchTaskController);
router.delete("/:id", mockAuth, deleteTaskController);

export default router;

