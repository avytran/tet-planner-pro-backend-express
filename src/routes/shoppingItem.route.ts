import { Router } from "express";
import { getShoppingItemByIdController } from "../controllers/shoppingItem.controller";

const router = Router();

router.get("/:id", getShoppingItemByIdController);

export default router;
