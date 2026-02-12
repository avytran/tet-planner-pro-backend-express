import { Router } from "express";
import {
  createTaskCategoryHandler,
  getTaskCategoriesHandler,
  getTaskCategoryByIdHandler,
  updateTaskCategoryHandler,
} from "../controllers/taskCategory.controller";

const router = Router();

router.get("/", getTaskCategoriesHandler);
router.get("/:categoryId", getTaskCategoryByIdHandler);
router.post("/", createTaskCategoryHandler);
router.put("/:categoryId", updateTaskCategoryHandler);

export default router;
