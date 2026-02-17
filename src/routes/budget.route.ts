import { Router } from "express";
import { getBudgetByIdController, getBudgetsController, deleteBudgetController, createBudgetController, updateBudgetController } from "../controllers/budget.controller";
import { mockAuth } from "../middlewares/mockAuth.mdw";
import validate from "../middlewares/validate.mdw";
import { CreatingBudgetAjvSchema, UpdatingBudgetAjvSchema } from "../entities/budget.entity";
import { verifyUser } from "../middlewares/verifyUser.mdw";

const router = Router({ mergeParams: true });

router.get("/:budgetId", mockAuth, verifyUser, getBudgetByIdController);
router.get("/", mockAuth, verifyUser, getBudgetsController);
router.delete("/:budgetId", mockAuth, verifyUser, deleteBudgetController);
router.post("/", validate(CreatingBudgetAjvSchema), mockAuth, verifyUser, createBudgetController);
router.put("/:budgetId", validate(UpdatingBudgetAjvSchema), mockAuth, verifyUser, updateBudgetController);

export default router;