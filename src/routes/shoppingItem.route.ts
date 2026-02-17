import { Router } from "express";
import { getShoppingItemByIdController, getShoppingItemsController, deleteShoppingItemController, createShoppingItemController, updateAllFieldsOfShoppingItemController } from "../controllers/shoppingItem.controller";
import validate from "../middlewares/validate.mdw";
import { CreatingShoppingItemAjvSchema, UpdatingAllFieldShoppingItemAjvSchema } from "../entities/shoppingItem.entity";
import { mockAuth } from "../middlewares/mockAuth.mdw";
import { verifyUser } from "../middlewares/verifyUser.mdw";

const router = Router({ mergeParams: true });

router.post("/", mockAuth, verifyUser, validate(CreatingShoppingItemAjvSchema), createShoppingItemController);
router.put("/:itemId", mockAuth, verifyUser, validate(UpdatingAllFieldShoppingItemAjvSchema), updateAllFieldsOfShoppingItemController);
router.get("/:itemId", mockAuth, verifyUser, getShoppingItemByIdController);
router.get("/", mockAuth, verifyUser, getShoppingItemsController)
router.delete("/:itemId", mockAuth, verifyUser, deleteShoppingItemController);

export default router;
