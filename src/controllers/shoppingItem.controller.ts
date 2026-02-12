import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { getShoppingItemById } from "../services/shoppingItem.service";

export const getShoppingItemByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
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
