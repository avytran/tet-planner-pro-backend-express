import TaskCategoryModel from "../database/models/taskCategory.model";
import { DbResult } from "../types/dbResult";
import { ITaskCategory } from "../database/models/taskCategory.model";
import { TaskCategory, CreateTaskCategoryInput, UpdateTaskCategoryInput } from "../types/taskCategory.type";
import { ObjectId } from "mongodb";

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
  userObjectid: ObjectId,
  categoryObjectId: ObjectId
): Promise<DbResult<object>> => {
  try {
    const taskCategory = await TaskCategoryModel.findOneAndDelete({
      _id: categoryObjectId,
      user_id: userObjectid,
    });

    if (!taskCategory) {
      return {
        status: "error",
        message: "Task category not found",
      };
    }

    return {
      status: "success",
      data: {
        "message": "Task category deleted successfully"
      },
    };
  } catch (error) {
    console.error("Failed to delete task category:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to delete task category",
    };
  }
};