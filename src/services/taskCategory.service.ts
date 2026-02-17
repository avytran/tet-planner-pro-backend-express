import TaskCategoryModel from "../database/models/taskCategory.model";
import TaskModel from "../database/models/task.model";
import ShoppingItemModel from "../database/models/shoppingItem.model";
import { DbResult } from "../types/dbResult";
import { TaskCategory, CreateTaskCategoryInput, UpdateTaskCategoryInput } from "../types/taskCategory.type";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const createTaskCategory = async (
  payload: CreateTaskCategoryInput
): Promise<DbResult<TaskCategory>> => {
  try {
    const taskCategory = await TaskCategoryModel.create(payload);

    return {
      status: "success",
      data: {
        id: taskCategory._id.toString(),
        userId: taskCategory.user_id.toString(),
        name: taskCategory.name,
        createdAt: taskCategory.created_at,
        updatedAt: taskCategory.updated_at,
      },
    };
  } catch (error) {
    console.error("Failed to create task category:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to create task",
    };
  }
};

export const getTaskCategoriesByUserId = async (
  userObjectid: ObjectId
): Promise<DbResult<TaskCategory[]>> => {
  try {
    const taskCategories = await TaskCategoryModel.find({ user_id: userObjectid });

    const result = taskCategories.map(category => ({
      id: category._id.toString(),
      userId: category.user_id.toString(),
      name: category.name,
      createdAt: category.created_at,
      updatedAt: category.updated_at,
    }))

    return {
      status: "success",
      data: result,
    };
  } catch (error) {
    console.error("Failed to get task categories:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to get task categories",
    };
  }
};

export const getTaskCategoryByIdForUser = async (
  userObjectId: ObjectId,
  categoryObjectId: ObjectId
): Promise<DbResult<TaskCategory | null>> => {
  try {
    const category = await TaskCategoryModel.findOne({
      _id: categoryObjectId,
      user_id: userObjectId,
    });

    if (!category) {
      return {
        status: "error",
        message: "Task category not found"
      }
    }

    return {
      status: "success",
      data: {
        id: category._id.toString(),
        userId: category.user_id.toString(),
        name: category.name,
        createdAt: category.created_at,
        updatedAt: category.updated_at,
      },
    };
  } catch (error) {
    console.error("Failed to get task category:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to get task category",
    };
  }
};

export const updateTaskCategory = async (
  userObjectId: ObjectId,
  categoryObjectId: ObjectId,
  payload: UpdateTaskCategoryInput
): Promise<DbResult<TaskCategory | null>> => {
  try {
    const category = await TaskCategoryModel.findOneAndUpdate(
      {
        _id: categoryObjectId,
        user_id: userObjectId,
      },
      { name: payload.name },
      { new: true, runValidators: true }
    );

    if (!category) {
      return {
        status: "error",
        message: "Task category not found",
      };
    }

    return {
      status: "success",
      data: {
        id: category._id.toString(),
        userId: category.user_id.toString(),
        name: category.name,
        createdAt: category.created_at,
        updatedAt: category.updated_at,
      },
    };
  } catch (error) {
    console.error("Failed to update task category:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update task category",
    };
  }
};

export const deleteTaskCategory = async (
  userObjectId: ObjectId,
  categoryObjectId: ObjectId
): Promise<DbResult<{ message: string }>> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const category = await TaskCategoryModel.findOneAndDelete(
      {
        _id: categoryObjectId,
        user_id: userObjectId,
      },
      { session }
    );

    if (!category) {
      await session.abortTransaction();
      return {
        status: "error",
        message: "Task category not found or not authorized",
      };
    }

    const tasks = await TaskModel.find(
      { category_id: categoryObjectId },
      { _id: 1 },
      { session }
    );

    const taskIds = tasks.map(t => t._id);

    if (taskIds.length > 0) {
      await ShoppingItemModel.deleteMany(
        { task_id: { $in: taskIds } },
        { session }
      );

      await TaskModel.deleteMany(
        { _id: { $in: taskIds } },
        { session }
      );
    }

    await session.commitTransaction();

    return {
      status: "success",
      data: {
        message: "Task category, related tasks and shopping items deleted successfully",
      },
    };
  } catch (error) {
    await session.abortTransaction();
    console.error("Failed to delete task category:", error);
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete task category",
    };
  } finally {
    session.endSession();
  }
};