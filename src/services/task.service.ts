import TaskModel, { ITask } from "../database/models/task.model";
import { Task, Timeline, Priority, TaskStatus } from "../types/task.types";
import { DbResult } from "../types/dbResult";

export interface CreateTaskInput {
  category_id: string;
  title: string;
  dued_time: Date | string;
  timeline: Task["timeline"];
  priority: Task["priority"];
  status: Task["status"];
}

export interface GetTasksFilter {
  category_id?: string;
  timeline?: Timeline;
  priority?: Priority;
  status?: TaskStatus;
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

export const getTasks = async (
  filter: GetTasksFilter
): Promise<DbResult<ITask[]>> => {
  try {
    const tasks = await TaskModel.find(filter).exec();

    return {
      status: "success",
      data: tasks,
    };
  } catch (error) {
    console.error("Failed to get tasks:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to get tasks",
    };
  }
};

export const getTaskById = async (_id: string): Promise<DbResult<ITask | null>> => {
  try {
    const task = await TaskModel.findById(_id).exec();

    return {
      status: "success",
      data: task,
    };
  } catch (error) {
    console.error("Failed to get task by id:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to get task",
    };
  }
};

export const updateTask = async (
  _id: string,
  payload: CreateTaskInput
): Promise<DbResult<ITask | null>> => {
  try {
    const task = await TaskModel.findByIdAndUpdate(_id, payload, {
      new: true,
      runValidators: true,
    }).exec();

    return {
      status: "success",
      data: task,
    };
  } catch (error) {
    console.error("Failed to update task:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update task",
    };
  }
};
