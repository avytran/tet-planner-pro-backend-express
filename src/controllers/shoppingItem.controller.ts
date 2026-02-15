import { Request, Response } from "express";
import { getShoppingItemById, getShoppingItems, deleteShoppingItem, createShoppingItem, updateAllFieldsOfShoppingItem } from "../services/shoppingItem.service";
import { checkValidId } from "../utils/db.util";

export const getShoppingItemByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    if (!checkValidId(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid request",
      }
      );
    }

    const result = await getShoppingItemById(id);

    if (result.status === "error") {
      if (result.message === "Shopping item not found") {
        return res.status(404).json(result);
      }

      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getShoppingItemsController = async (
  req: Request,
  res: Response
) => {
  const query = req.query;

  try {
    const result = await getShoppingItems(query);

    if (result.status === "error") {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export const deleteShoppingItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    if (!checkValidId(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid request",
      }
      );
    }

    const result = await deleteShoppingItem(id);

    if (result.status === "error") {
      if (result.message === "Shopping item not found") {
        return res.status(404).json(result);
      }

      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const createShoppingItemController = async (
  req: Request,
  res: Response
) => {
  const item = req.body;

  try {
    if (!checkValidId(item.budgetId) || !checkValidId(item.taskId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid request",
      }
      );
    }

    const result = await createShoppingItem(item);

    if (result.status === "error") {
      return res.status(500).json(result);
    }

    return res.status(201).json(result);

  } catch (error) {
    console.error("Controller Error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export const updateAllFieldsOfShoppingItemController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id as string;
  const item = req.body;

  try {
    if (!checkValidId(item.budgetId) || !checkValidId(item.taskId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid request",
      }
      );
    }

    const result = await updateAllFieldsOfShoppingItem(id, item);

    if (result.status === "error") {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error("Controller Error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}