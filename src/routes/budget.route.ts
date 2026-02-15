import { Router } from "express";
import { getBudgetByIdController, getBudgetsController } from "../controllers/budget.controller";
import { mockAuth } from "../middlewares/mockAuth.mdw";

const router = Router();

router.get("/:id", getBudgetByIdController);
router.get("/", mockAuth, getBudgetsController);

export default router;