import { Router } from "express";
import { getBudgetByIdController, getBudgetsController, deleteBudgetController, createBudgetController, updateBudgetController } from "../controllers/budget.controller";
import { mockAuth } from "../middlewares/mockAuth.mdw";
import validate from "../middlewares/validate.mdw";
import { CreatingBudgetAjvSchema, UpdatingBudgetAjvSchema } from "../entities/budget.entity";

const router = Router();

router.get("/:id", getBudgetByIdController);
router.get("/", mockAuth, getBudgetsController);
router.delete("/:id", deleteBudgetController);
router.post("/", validate(CreatingBudgetAjvSchema), mockAuth, createBudgetController);
router.put("/:id", validate(UpdatingBudgetAjvSchema), mockAuth, updateBudgetController);

export default router;