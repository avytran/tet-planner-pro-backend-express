import { Router } from "express";
import {
  createTaskCategoryHandler,
  getTaskCategoriesHandler,
  getTaskCategoryByIdHandler,
} from "../controllers/taskCategory.controller";

const router = Router();

router.get("/", getTaskCategoriesHandler);
router.get("/:categoryId", getTaskCategoryByIdHandler);
router.post("/", createTaskCategoryHandler);

export default router;
