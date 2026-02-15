import mongoose from "mongoose";
import ShoppingItemModel from "../database/models/shoppingItem.model";
import BudgetModel from "../database/models/budget.model";
import { DbResult } from "../types/dbResult";
import { ShoppingItem, ShoppingItemQuery } from "../types/shoppingItem";
import { getUserBudgetIds } from "../utils/db.util";

export const getShoppingItemById = async (
  itemId: string,
  userId: string
): Promise<DbResult<ShoppingItem>> => {
  try {
    const userBudgetIds = await getUserBudgetIds(userId);

    const item = await ShoppingItemModel.findOne({
      _id: itemId,
      budget_id: { $in: userBudgetIds }
    });

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
        budgetId: item.budget_id.toString(),
        taskId: item.task_id.toString(),
        name: item.name,
        price: item.price,
        status: item.status,
        quantity: item.quantity,
        duedTime: item.dued_time,
        timeline: item.timeline,
        createdAt: item.created_at,
        updatedAt: item.updated_at
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

export const getShoppingItems = async (query: ShoppingItemQuery, userId: string): Promise<DbResult<object>> => {
  try {
    const userBudgetIds = await getUserBudgetIds(userId);

    if (userBudgetIds.length === 0) {
      return {
        status: "success",
        data: { page: 1, pageSize: 10, totalItems: 0, totalPages: 0, items: [] }
      };
    }

    const {
      budgetId,
      taskId,
      timeline,
      duedTime,
      status,
      keyword,
      sortBy = "created_at",
      sortOrder = "desc",
      page = 1,
      pageSize = 10
    } = query;

    const filter: any = {
      budget_id: { $in: userBudgetIds }
    };

    // Filters
    if (timeline) filter.timeline = timeline;
    if (status) filter.status = status;

    if (budgetId && mongoose.Types.ObjectId.isValid(budgetId)) {
      filter.budget_id = new mongoose.Types.ObjectId(budgetId);
    }

    if (taskId && mongoose.Types.ObjectId.isValid(taskId)) {
      filter.task_id = new mongoose.Types.ObjectId(taskId);
    }

    if (duedTime) {
      const start = new Date(duedTime);
      const end = new Date(duedTime);
      end.setHours(23, 59, 59, 999);
      filter.dued_time = { $gte: start, $lte: end };
    }

    // Search keyword
    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }

    // Sort
    const sort: any = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * pageSize;

    const [items, totalItems] = await Promise.all([
      ShoppingItemModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(pageSize)),
      ShoppingItemModel.countDocuments(filter)
    ]);

    const result = items.map(item => ({
      id: item._id.toString(),
      budgetId: item.budget_id.toString(),
      taskId: item.task_id.toString(),
      name: item.name,
      price: item.price,
      status: item.status,
      quantity: item.quantity,
      duedTime: item.dued_time,
      timeline: item.timeline,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }))

    return {
      status: "success",
      data: {
        page: Number(page),
        pageSize: Number(pageSize),
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
        items: result
      }
    };
  } catch (error) {
    console.error("getShoppingItems error:", error);
    return {
      status: "error",
      message: "Internal server error",
    };
  }
}

export const deleteShoppingItem = async (itemId: string, userId: string): Promise<DbResult<object>> => {
  try {
    const userBudgetIds = await getUserBudgetIds(userId);

    const result = await ShoppingItemModel.deleteOne({
      _id: itemId,
      budget_id: { $in: userBudgetIds }
    });

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

export const createShoppingItem = async (item: ShoppingItem, userId: string): Promise<DbResult<ShoppingItem>> => {
  try {
    const budget = await BudgetModel.findOne({
      _id: item.budgetId,
      user_id: userId
    });

    if (!budget) {
      return {
        status: "error",
        message: "Budget does not belong to user"
      };
    }

    // Task

    const budgetObjectId = new mongoose.Types.ObjectId(item.budgetId);
    const taskObjectId = new mongoose.Types.ObjectId(item.taskId);

    const result = await ShoppingItemModel.insertOne({
      budget_id: budgetObjectId,
      task_id: taskObjectId,
      name: item.name,
      price: item.price,
      status: item.status,
      quantity: item.quantity,
      dued_time: item.duedTime,
      timeline: item.timeline,
    });

    return {
      status: "success",
      data: {
        id: result._id.toString(),
        budgetId: result.budget_id.toString(),
        taskId: result.task_id.toString(),
        name: result.name,
        price: result.price,
        status: result.status,
        quantity: result.quantity,
        duedTime: result.dued_time,
        timeline: result.timeline,
        createdAt: result.created_at,
        updatedAt: result.updated_at
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

export const updateAllFieldsOfShoppingItem = async (itemId: string, payload: Partial<ShoppingItem>, userId: string): Promise<DbResult<ShoppingItem>> => {
  try {
    const userBudgetIds = await getUserBudgetIds(userId);

    if (payload.budgetId && !userBudgetIds.some(id => id.toString() === payload.budgetId)) {
      return {
        status: "error", 
        message: "Budget does not belong to user"
      };
    }

    const updatedItem = await ShoppingItemModel.findByIdAndUpdate(
      { _id: itemId, budget_id: { $in: userBudgetIds } },
      {
        $set: {
          budget_id: payload.budgetId ? new mongoose.Types.ObjectId(payload.budgetId) : undefined,
        task_id: payload.taskId ? new mongoose.Types.ObjectId(payload.taskId) : undefined,
          name: payload.name,
          price: payload.price,
          status: payload.status,
          quantity: payload.quantity,
          dued_time: payload.duedTime,
          timeline: payload.timeline,
        }
      },
      { new: true }
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
        budgetId: updatedItem.budget_id.toString(),
        taskId: updatedItem.task_id.toString(),
        name: updatedItem.name,
        price: updatedItem.price,
        status: updatedItem.status,
        quantity: updatedItem.quantity,
        duedTime: updatedItem.dued_time,
        timeline: updatedItem.timeline,
        createdAt: updatedItem.created_at,
        updatedAt: updatedItem.updated_at
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