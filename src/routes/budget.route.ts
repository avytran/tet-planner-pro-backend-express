import { Router } from "express";
import { getBudgetByIdController, getBudgetsController, deleteBudgetController } from "../controllers/budget.controller";
import { mockAuth } from "../middlewares/mockAuth.mdw";

const router = Router();

router.get("/:id", getBudgetByIdController);
router.get("/", mockAuth, getBudgetsController);
router.delete("/:id", deleteBudgetController);

export default router;