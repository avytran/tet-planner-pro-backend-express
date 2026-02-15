import { Router } from "express";
import { getShoppingItemByIdController, getShoppingItemsController, deleteShoppingItemController, createShoppingItemController, updateAllFieldsOfShoppingItemController } from "../controllers/shoppingItem.controller";
import validate from "../middlewares/validate.mdw";
import { CreatingShoppingItemAjvSchema, UpdatingAllFieldShoppingItemAjvSchema } from "../entities/shoppingItem.entity";
import { mockAuth } from "../middlewares/mockAuth.mdw";

const router = Router();

router.post("/", mockAuth, validate(CreatingShoppingItemAjvSchema), createShoppingItemController);
router.put("/:id", mockAuth, validate(UpdatingAllFieldShoppingItemAjvSchema), updateAllFieldsOfShoppingItemController);
router.get("/:id", mockAuth, getShoppingItemByIdController);
router.get("/", mockAuth, getShoppingItemsController)
router.delete("/:id", mockAuth, deleteShoppingItemController);

export default router;
