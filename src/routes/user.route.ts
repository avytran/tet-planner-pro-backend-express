import { Router } from "express";
import { getTotalBudgetOfUserController, updateTotalBudgetOfUserController } from "../controllers/user.controller";
import { mockAuth } from "../middlewares/mockAuth.mdw";
import validate from "../middlewares/validate.mdw";
import { verifyUser } from "../middlewares/verifyUser.mdw";
import { updatingTotalBudgetAjvSchema } from "../entities/user.entity";

const router = Router();

router.get("/:userId/total-budget", mockAuth, verifyUser, getTotalBudgetOfUserController);
router.patch("/:userId/total-budget", mockAuth, verifyUser, validate(updatingTotalBudgetAjvSchema), updateTotalBudgetOfUserController);

export default router;