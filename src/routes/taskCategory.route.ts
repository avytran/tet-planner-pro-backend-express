import { Router } from "express";
import {
  createTaskCategoryController,
  getTaskCategoriesController,
  getTaskCategoryByIdController,
  updateTaskCategoryController,
  deleteTaskCategoryController,
} from "../controllers/taskCategory.controller";
import validate from "../middlewares/validate.mdw";
import { mockAuth } from "../middlewares/mockAuth.mdw";
import { CreatingTaskCategoryAjvSchema, UpdatingTaskCategoryAjvSchema } from "../entities/taskCategory.entity";

const router = Router();

router.get("/", mockAuth, getTaskCategoriesController);
router.get("/:id", mockAuth, getTaskCategoryByIdController);
router.post("/", mockAuth, validate(CreatingTaskCategoryAjvSchema), createTaskCategoryController);
router.put("/:id", mockAuth, validate(UpdatingTaskCategoryAjvSchema), updateTaskCategoryController);
router.delete("/:id", mockAuth, deleteTaskCategoryController);

export default router;
