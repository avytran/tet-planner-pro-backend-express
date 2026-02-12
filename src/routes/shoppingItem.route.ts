import { Router } from "express";
import { getShoppingItemByIdController, deleteShoppingItemController, createShoppingItemController } from "../controllers/shoppingItem.controller";
import validate from "../middlewares/validate.mdw";
import { CreatingShoppingItemAjvSchema } from "../entities/shoppingItem.entity";

const router = Router();

router.post("/", validate(CreatingShoppingItemAjvSchema), createShoppingItemController);
router.get("/:id", getShoppingItemByIdController);
router.delete("/:id", deleteShoppingItemController);

export default router;
