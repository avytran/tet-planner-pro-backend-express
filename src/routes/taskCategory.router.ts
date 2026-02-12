import { Router } from "express";
import { createTaskCategoryHandler } from "../controllers/taskCategory.controller";

const router = Router();

router.post("/", createTaskCategoryHandler);

export default router;
