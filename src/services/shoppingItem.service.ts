import { ObjectId } from "mongodb";

import ShoppingItemModel from "../database/models/shoppingItem.model";
import { DbResult } from "../types/dbResult";
import { ShoppingItem } from "../types/shoppingItem";

export const getShoppingItemById = async (
  id: string
): Promise<DbResult<ShoppingItem>> => {
  try {
    if (!ObjectId.isValid(id)) {
      return {
        status: "error",
        message: "Invalid ID format",
      };
    }

    const item = await ShoppingItemModel.findById(id).exec();

    if (!item) {
      return {
        status: "error",
        message: "Shopping item not found",
      };
    }

    return {
      status: "success",
      data: {
        id: item._id,
        budget_id: item.budget_id,
        task_id: item.task_id,
        name: item.name,
        price: item.price,
        status: item.status,
        quantity: item.quantity,
        dued_time: item.dued_time,
        timeline: item.timeline,
        created_at: item.created_at,
        updated_at: item.updated_at
      },
    };
  } catch (error) {
    console.error("getShoppingItemById error:", error);
    return {
      status: "error",
      message: "Internal server error",
    };
  }
};
