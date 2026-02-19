import { Router } from "express";
import { getTotalBudgetOfUserController, updateTotalBudgetOfUserController } from "../controllers/user.controller";
import validate from "../middlewares/validate.mdw";
import { verifyUser } from "../middlewares/verifyUser.mdw";
import { verifyJwt } from "../middlewares/auth.mdw";
import { updatingTotalBudgetAjvSchema } from "../entities/user.entity";

const router = Router();

router.get("/:userId/total-budget", verifyJwt, verifyUser, getTotalBudgetOfUserController);
router.patch("/:userId/total-budget", verifyJwt, verifyUser, validate(updatingTotalBudgetAjvSchema), updateTotalBudgetOfUserController);

export default router;