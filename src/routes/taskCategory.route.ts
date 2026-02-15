import { Router } from "express";
import {
  createTaskCategoryHandler,
  getTaskCategoriesHandler,
  getTaskCategoryByIdHandler,
  updateTaskCategoryHandler,
  deleteTaskCategoryHandler,
} from "../controllers/taskCategory.controller";
import validate from "../middlewares/validate.mdw";
import { mockAuth } from "../middlewares/mockAuth.mdw";
import { CreatingTaskCategoryAjvSchema, UpdatingTaskCategoryAjvSchema } from "../entities/taskCategory.entity";

const router = Router();

router.get("/", mockAuth, getTaskCategoriesHandler);
router.get("/:id", mockAuth, getTaskCategoryByIdHandler);
router.post("/", mockAuth, validate(CreatingTaskCategoryAjvSchema), createTaskCategoryHandler);
router.put("/:id", mockAuth, validate(UpdatingTaskCategoryAjvSchema), updateTaskCategoryHandler);
router.delete("/:id", mockAuth, deleteTaskCategoryHandler);

export default router;
