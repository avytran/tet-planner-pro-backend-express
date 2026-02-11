import { Router } from "express";
import { createTaskHandler } from "../controllers/task.controller";

const router = Router();

router.post("/", createTaskHandler);

export default router;

