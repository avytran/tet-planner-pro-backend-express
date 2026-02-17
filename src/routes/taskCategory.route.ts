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
import { verifyUser } from "../middlewares/verifyUser.mdw";
import { CreatingTaskCategoryAjvSchema, UpdatingTaskCategoryAjvSchema } from "../entities/taskCategory.entity";

const router = Router({ mergeParams: true });

router.get("/", mockAuth, verifyUser, getTaskCategoriesController);
router.get("/:categoryId", mockAuth, verifyUser, getTaskCategoryByIdController);
router.post("/", mockAuth, verifyUser, validate(CreatingTaskCategoryAjvSchema), createTaskCategoryController);
router.put("/:categoryId", mockAuth, verifyUser, validate(UpdatingTaskCategoryAjvSchema), updateTaskCategoryController);
router.delete("/:categoryId", mockAuth, verifyUser, deleteTaskCategoryController);

export default router;
