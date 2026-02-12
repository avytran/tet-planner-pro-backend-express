import { Router } from "express";
import { createTaskCategoryHandler, getTaskCategoriesHandler } from "../controllers/taskCategory.controller";

const router = Router();

router.get("/", getTaskCategoriesHandler);
router.post("/", createTaskCategoryHandler);

export default router;
