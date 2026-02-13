import { Router } from "express";
import { getBudgetByIdController } from "../controllers/budget.controller";

const router = Router();

router.get("/:id", getBudgetByIdController);

export default router;