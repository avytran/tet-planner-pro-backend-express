import { Router } from "express";
import { getShoppingItemByIdController, deleteShoppingItemController, createShoppingItemController, updateAllFieldsOfShoppingItemController } from "../controllers/shoppingItem.controller";
import validate from "../middlewares/validate.mdw";
import { CreatingShoppingItemAjvSchema, UpdatingAllFieldShoppingItemAjvSchema } from "../entities/shoppingItem.entity";

const router = Router();

router.post("/", validate(CreatingShoppingItemAjvSchema), createShoppingItemController);
router.put("/:id", validate(UpdatingAllFieldShoppingItemAjvSchema), updateAllFieldsOfShoppingItemController);
router.get("/:id", getShoppingItemByIdController);
router.delete("/:id", deleteShoppingItemController);

export default router;
