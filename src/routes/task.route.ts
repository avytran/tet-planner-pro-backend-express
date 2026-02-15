import { Router } from "express";
import {
  createTaskHandler,
  getTasksHandler,
  getTaskByIdHandler,
  updateTaskHandler,
  patchTaskHandler,
  deleteTaskHandler,
} from "../controllers/task.controller";
import validate from "../middlewares/validate.mdw";
import { creatingTaskAjvSchema, updatingTaskAjvSchema, patchingTaskAjvSchema } from "../entities/task.entity";

const router = Router();

router.post("/", validate(creatingTaskAjvSchema), createTaskHandler);
router.get("/", getTasksHandler);
router.get("/:id", getTaskByIdHandler);
router.put("/:id", validate(updatingTaskAjvSchema), updateTaskHandler);
router.patch("/:id", validate(patchingTaskAjvSchema), patchTaskHandler);
router.delete("/:id", deleteTaskHandler);

export default router;

