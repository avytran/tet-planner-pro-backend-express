import TaskCategoryModel from "../database/models/taskCategory.model";
import { DbResult } from "../types/dbResult";
import { ITaskCategory } from "../database/models/taskCategory.model";

export interface CreateTaskCategoryInput {
  user_id: string;
  name: string;
}

export interface UpdateTaskCategoryInput {
  name: string;
}
  
  export const createTaskCategory = async (
    payload: CreateTaskCategoryInput
  ): Promise<DbResult<ITaskCategory>> => {
    try {
      const taskCategory = await TaskCategoryModel.create(payload);
  
      return {
        status: "success",
        data: taskCategory,
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
  user_id: string
): Promise<DbResult<ITaskCategory[]>> => {
  try {
    const taskCategories = await TaskCategoryModel.find({ user_id });

    return {
      status: "success",
      data: taskCategories,
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
  user_id: string,
  categoryId: string
): Promise<DbResult<ITaskCategory | null>> => {
  try {
    const taskCategory = await TaskCategoryModel.findOne({
      _id: categoryId,
      user_id,
    });

    return {
      status: "success",
      data: taskCategory,
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
  user_id: string,
  categoryId: string,
  payload: UpdateTaskCategoryInput
): Promise<DbResult<ITaskCategory | null>> => {
  try {
    const taskCategory = await TaskCategoryModel.findOneAndUpdate(
      {
        _id: categoryId,
        user_id,
      },
      { name: payload.name },
      { new: true, runValidators: true }
    );

    if (!taskCategory) {
      return {
        status: "error",
        message: "Task category not found",
      };
    }

    return {
      status: "success",
      data: taskCategory,
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
  user_id: string,
  categoryId: string
): Promise<DbResult<null>> => {
  try {
    const taskCategory = await TaskCategoryModel.findOneAndDelete({
      _id: categoryId,
      user_id,
    });

    if (!taskCategory) {
      return {
        status: "error",
        message: "Task category not found",
      };
    }

    return {
      status: "success",
      data: null,
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