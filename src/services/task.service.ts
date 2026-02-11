import TaskModel, { ITask } from "../database/models/task.model";
import { Task } from "../types/task.types";
import { DbResult } from "../types/dbResult";

export interface CreateTaskInput {
  category_id: string;
  title: string;
  dued_time: Date | string;
  timeline: Task["timeline"];
  priority: Task["priority"];
  status: Task["status"];
}

export const createTask = async (
  payload: CreateTaskInput
): Promise<DbResult<ITask>> => {
  try {
    const task = await TaskModel.create(payload);

    return {
      status: "success",
      data: task,
    };
  } catch (error) {
    console.error("Failed to create task:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to create task",
    };
  }
};
