import { Router } from "express";
import { getShoppingItemByIdController, deleteShoppingItemController } from "../controllers/shoppingItem.controller";

const router = Router();

router.get("/:id", getShoppingItemByIdController);
router.delete("/:id", deleteShoppingItemController);

export default router;
