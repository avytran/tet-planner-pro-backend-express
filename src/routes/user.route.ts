import { Router } from "express";
import { getTotalBudgetOfUserController } from "../controllers/user.controller";
import { mockAuth } from "../middlewares/mockAuth.mdw";
import validate from "../middlewares/validate.mdw";
import { verifyUser } from "../middlewares/verifyUser.mdw";

const router = Router();

router.get("/:userId/total-budget", mockAuth, verifyUser, getTotalBudgetOfUserController);

export default router;