import { Router } from "express";
import {
  createTaskCategoryController,
  getTaskCategoriesController,
  getTaskCategoryByIdController,
  updateTaskCategoryController,
  deleteTaskCategoryController,
} from "../controllers/taskCategory.controller";
import validate from "../middlewares/validate.mdw";
import { verifyUser } from "../middlewares/verifyUser.mdw";
import { verifyJwt } from "../middlewares/auth.mdw";
import { CreatingTaskCategoryAjvSchema, UpdatingTaskCategoryAjvSchema } from "../entities/taskCategory.entity";

const router = Router({ mergeParams: true });

router.get("/", verifyJwt, verifyUser, getTaskCategoriesController);
router.get("/:categoryId", verifyJwt, verifyUser, getTaskCategoryByIdController);
router.post("/", verifyJwt, verifyUser, validate(CreatingTaskCategoryAjvSchema), createTaskCategoryController);
router.put("/:categoryId", verifyJwt, verifyUser, validate(UpdatingTaskCategoryAjvSchema), updateTaskCategoryController);
router.delete("/:categoryId", verifyJwt, verifyUser, deleteTaskCategoryController);

export default router;
