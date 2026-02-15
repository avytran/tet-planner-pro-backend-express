import mongoose from "mongoose";

import ShoppingItemModel from "../database/models/shoppingItem.model";
import { DbResult } from "../types/dbResult";
import { ShoppingItem, ShoppingItemQuery } from "../types/shoppingItem";

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
        id: item._id.toString(),
        budget_id: item.budget_id.toString(),
        task_id: item.task_id.toString(),
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

export const getShoppingItems = async (query: ShoppingItemQuery): Promise<DbResult<object> | null> => {
  const {
    budget_id,
    task_id,
    timeline,
    dued_date,
    status,
    keyword,
    sort_by = "created_at",
    sort_order = "desc",
    page = 1,
    page_size = 10
  } = query;

  const filter: any = {};

  // Filters
  if (timeline) filter.timeline = timeline;
  if (status) filter.status = status;

  if (budget_id && mongoose.Types.ObjectId.isValid(budget_id)) {
    filter.budget_id = new mongoose.Types.ObjectId(budget_id);
  }

  if (task_id && mongoose.Types.ObjectId.isValid(task_id)) {
    filter.task_id = new mongoose.Types.ObjectId(task_id);
  }

  if (dued_date) {
    const start = new Date(dued_date);
    const end = new Date(dued_date);
    end.setHours(23, 59, 59, 999);
    filter.dued_time = { $gte: start, $lte: end };
  }

  // Search keyword
  if (keyword) {
    filter.name = { $regex: keyword, $options: "i" };
  }

  // Sort
  const sort: any = {};
  sort[sort_by] = sort_order === "asc" ? 1 : -1;

  const skip = (page - 1) * page_size;

  const [items, total] = await Promise.all([
    ShoppingItemModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(page_size)),
    ShoppingItemModel.countDocuments(filter)
  ]);

  return {
    status: "success",
    data: {
      items,
      pagination: {
        total,
        page: Number(page),
        page_size: Number(page_size),
        total_pages: Math.ceil(total / page_size)
      }
    }
  };
}

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
    const budget_id = new mongoose.Types.ObjectId(item.budget_id);
    const task_id = new mongoose.Types.ObjectId(item.task_id);

    const result = await ShoppingItemModel.insertOne({ ...item, budget_id, task_id });

    return {
      status: "success",
      data: {
        id: result._id.toString(),
        budget_id: result.budget_id.toString(),
        task_id: result.task_id.toString(),
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

export const updateAllFieldsOfShoppingItem = async (
  id: string,
  payload: Partial<ShoppingItem>
): Promise<DbResult<ShoppingItem>> => {
  try {

    const taskObjectId = new mongoose.Types.ObjectId(payload.task_id);
    const budgetObjectId = new mongoose.Types.ObjectId(payload.budget_id);

    const updatedItem = await ShoppingItemModel.findByIdAndUpdate(
      id,
      { $set: { ...payload, task_id: taskObjectId, budget_id: budgetObjectId } },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedItem) {
      return {
        status: "error",
        message: "Shopping item not found",
      };
    }

    return {
      status: "success",
      data: {
        id: updatedItem._id.toString(),
        budget_id: updatedItem.budget_id.toString(),
        task_id: updatedItem.task_id.toString(),
        name: updatedItem.name,
        price: updatedItem.price,
        status: updatedItem.status,
        quantity: updatedItem.quantity,
        dued_time: updatedItem.dued_time,
        timeline: updatedItem.timeline,
        created_at: updatedItem.created_at,
        updated_at: updatedItem.updated_at
      },
    };
  } catch (error) {
    console.error("updateShoppingItem error:", error);
    return {
      status: "error",
      message: "Internal server error",
    };
  }
};