import { Router } from "express";
import {
  createTaskCategoryHandler,
  getTaskCategoriesHandler,
  getTaskCategoryByIdHandler,
  updateTaskCategoryHandler,
  deleteTaskCategoryHandler,
} from "../controllers/taskCategory.controller";

const router = Router();

router.get("/", getTaskCategoriesHandler);
router.get("/:categoryId", getTaskCategoryByIdHandler);
router.post("/", createTaskCategoryHandler);
router.put("/:categoryId", updateTaskCategoryHandler);
router.delete("/:categoryId", deleteTaskCategoryHandler);

export default router;
