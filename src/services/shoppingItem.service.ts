import ShoppingItemModel from "../database/models/shoppingItem.model";
import { DbResult } from "../types/dbResult";
import { ShoppingItem } from "../types/shoppingItem";

export const getShoppingItemById = async (
  id: string
): Promise<DbResult<ShoppingItem>> => {
  try {
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

export const deleteShoppingItem = async (id: string): Promise<DbResult<object> | null> => {
  try {
    const result = await ShoppingItemModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return {
        status: "error",
        message: "Shopping item not found",
      };
    }

    return {
      status: "success",
      data: {
        "message": "Shopping item deleted successfully"
      }
    }
  } catch (error) {
    console.error("deleteShoppingItem error:", error);
    return {
      status: "error",
      message: "Internal server error",
    };
  }
}

export const createShoppingItem = async (item: ShoppingItem): Promise<DbResult<ShoppingItem> | null> => {
  try {
    const result = await ShoppingItemModel.insertOne(item);

    return {
      status: "success",
      data: {
        id: result._id,
        budget_id: result.budget_id,
        task_id: result.task_id,
        name: result.name,
        price: result.price,
        status: result.status,
        quantity: result.quantity,
        dued_time: result.dued_time,
        timeline: result.timeline,
        created_at: result.created_at,
        updated_at: result.updated_at
      }
    }
  } catch (error) {
    console.error("createShoppingItem error:", error);
    return {
      status: "error",
      message: "Internal server error",
    };
  }
}

export const updateAllFieldsOfShoppingItem = async (id: string, item: ShoppingItem): Promise<DbResult<ShoppingItem> | null> => {
  try {
    const result = await ShoppingItemModel.updateOne({ _id: id }, { $set: item });

    return {
      status: "success",
      data: {
        id,
        ...item
      }
    }
  } catch (error) {
    console.error("createShoppingItem error:", error);
    return {
      status: "error",
      message: "Internal server error",
    };
  }
}