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
import { verifyUser } from "../middlewares/verifyUser.mdw";

const router = Router({ mergeParams: true });

router.post("/", mockAuth, verifyUser, validate(creatingTaskAjvSchema), createTaskController);
router.get("/", mockAuth, verifyUser, getTasksController);
router.get("/:taskId", mockAuth, verifyUser, getTaskByIdController);
router.put("/:taskId", mockAuth, verifyUser, validate(updatingTaskAjvSchema), updateTaskController);
router.patch("/:taskId", mockAuth, verifyUser, validate(patchingTaskAjvSchema), patchTaskController);
router.delete("/:taskId", mockAuth, verifyUser, deleteTaskController);

export default router;

