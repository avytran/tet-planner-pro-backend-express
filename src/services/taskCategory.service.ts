import TaskCategoryModel from "../database/models/taskCategory.model";
import { DbResult } from "../types/dbResult";
import { ITaskCategory } from "../database/models/taskCategory.model";

export interface CreateTaskCategoryInput {
  user_id: string;
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