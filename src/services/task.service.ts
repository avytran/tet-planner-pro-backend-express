import TaskModel, { ITask } from "../database/models/task.model";
import { Task, CreateTaskInput, UpdateTaskInput, GetTasksFilter } from "../types/task";
import { DbResult } from "../types/dbResult";

export const createTask = async (
  payload: CreateTaskInput
): Promise<DbResult<Task>> => {
  try {
    const task = await TaskModel.create(payload);

    return {
      status: "success",
      data: {
        id: task._id.toString(),
        categoryId: task.category_id.toString(),
        title: task.title,
        duedTime: task.dued_time,
        timeline: task.timeline,
        priority: task.priority,
        status: task.status,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      },
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
): Promise<DbResult<Task[]>> => {
  try {
    const tasks = await TaskModel.find(filter).exec();

    const result = tasks.map(task => ({
      id: task._id.toString(),
      categoryId: task.category_id.toString(),
      title: task.title,
      duedTime: task.dued_time,
      timeline: task.timeline,
      priority: task.priority,
      status: task.status,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
    }))

    return {
      status: "success",
      data: result,
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

export const getTaskById = async (id: string): Promise<DbResult<Task | null>> => {
  try {
    const task = await TaskModel.findById(id).exec();

    return {
      status: "success",
      data: {
        id: task._id.toString(),
        categoryId: task.category_id.toString(),
        title: task.title,
        duedTime: task.dued_time,
        timeline: task.timeline,
        priority: task.priority,
        status: task.status,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      },
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
  id: string,
  payload: CreateTaskInput
): Promise<DbResult<Task | null>> => {
  try {
    const task = await TaskModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).exec();

    return {
      status: "success",
      data: {
        id: task._id.toString(),
        categoryId: task.category_id.toString(),
        title: task.title,
        duedTime: task.dued_time,
        timeline: task.timeline,
        priority: task.priority,
        status: task.status,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      },
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

export const patchTask = async (
  _id: string,
  payload: UpdateTaskInput
): Promise<DbResult<Task | null>> => {
  try {
    const task = await TaskModel.findByIdAndUpdate(_id, payload, {
      new: true,
      runValidators: true,
    }).exec();

    return {
      status: "success",
      data: {
        id: task._id.toString(),
        categoryId: task.category_id.toString(),
        title: task.title,
        duedTime: task.dued_time,
        timeline: task.timeline,
        priority: task.priority,
        status: task.status,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      },
    };
  } catch (error) {
    console.error("Failed to patch task:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to patch task",
    };
  }
};

export const deleteTask = async (
  _id: string
): Promise<DbResult<{ message: string }>> => {
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(_id).exec();
    if (!deletedTask) {
      return {
        status: "error",
        message: "Task not found",
      };
    }
    return {
      status: "success",
      data: { message: "Task deleted successfully" },
    };
  } catch (error) {
    console.error("Failed to delete task:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to delete task",
    };
  }
}
