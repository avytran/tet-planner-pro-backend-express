import TaskModel from "../database/models/task.model";
import TaskCategoryModel from "../database/models/taskCategory.model";
import { Task, CreateTaskInput, UpdateTaskInput, GetTasksFilter } from "../types/task";
import { DbResult } from "../types/dbResult";
import { getUserCategoryIds } from "../utils/db.util";
import mongoose from "mongoose";

export const createTask = async (
  payload: CreateTaskInput,
  userId: string
): Promise<DbResult<Task>> => {
  try {
    const category = await TaskCategoryModel.findOne({
      _id: payload.category_id,
      user_id: userId
    });

    if (!category) {
      return {
        status: "error",
        message: "Category does not belong to user"
      };
    }

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
  filter: GetTasksFilter,
  userId: string
): Promise<DbResult<Task[]>> => {
  try {
    const userCategoryIds = await getUserCategoryIds(userId);

    const query: any = {
      category_id: { $in: userCategoryIds }
    };

    if (filter.category_id) {
      if (!userCategoryIds.some(id => id.toString() === filter.category_id.toString())) {
        return {
          status: "error",
          message: "Category does not belong to user"
        };
      }
      query.category_id = new mongoose.Types.ObjectId(filter.category_id);
    }

    if (filter.status) query.status = filter.status;
    if (filter.timeline) query.timeline = filter.timeline;

    const tasks = await TaskModel.find(query).exec();

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

export const getTaskById = async (taskId: string, userId: string): Promise<DbResult<Task | null>> => {
  try {
    const userCategoryIds = await getUserCategoryIds(userId);

    const task = await TaskModel.findOne({
      _id: taskId,
      category_id: { $in: userCategoryIds }
    });

    if (!task) {
      return { status: "error", message: "Task not found" };
    }

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
  taskId: string,
  payload: CreateTaskInput,
  userId: string
): Promise<DbResult<Task | null>> => {
  try {
    const userCategoryIds = await getUserCategoryIds(userId);

    if (payload.category_id) {
      const isValidCategory = userCategoryIds.some(
        cid => cid.toString() === payload.category_id.toString()
      );

      if (!isValidCategory) {
        return {
          status: "error",
          message: "Category does not belong to user",
        };
      }
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
      {
        _id: taskId,
        category_id: { $in: userCategoryIds },
      },
      {
        $set: {
          category_id: payload.category_id,
          title: payload.title,
          dued_time: payload.dued_time,
          timeline: payload.timeline,
          priority: payload.priority,
          status: payload.status,
        },
      },
      { new: true, runValidators: true }
    ).exec();

    if (!updatedTask) {
      return {
        status: "error",
        message: "Task not found or not authorized",
      };
    }

    return {
      status: "success",
      data: {
        id: updatedTask._id.toString(),
        categoryId: updatedTask.category_id.toString(),
        title: updatedTask.title,
        duedTime: updatedTask.dued_time,
        timeline: updatedTask.timeline,
        priority: updatedTask.priority,
        status: updatedTask.status,
        createdAt: updatedTask.created_at,
        updatedAt: updatedTask.updated_at,
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
  taskId: string,
  payload: UpdateTaskInput,
  userId: string
): Promise<DbResult<Task | null>> => {
  try {
    const userCategoryIds = await getUserCategoryIds(userId);

    if (payload.category_id) {
      const isValidCategory = userCategoryIds.some(
        cid => cid.toString() === payload.category_id.toString()
      );

      if (!isValidCategory) {
        return {
          status: "error",
          message: "Category does not belong to user",
        };
      }
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
      {
        _id: taskId,
        category_id: { $in: userCategoryIds },
      },
      { $set: payload },
      { new: true, runValidators: true }
    ).exec();

    if (!updatedTask) {
      return {
        status: "error",
        message: "Task not found or not authorized",
      };
    }

    return {
      status: "success",
      data: {
        id: updatedTask._id.toString(),
        categoryId: updatedTask.category_id.toString(),
        title: updatedTask.title,
        duedTime: updatedTask.dued_time,
        timeline: updatedTask.timeline,
        priority: updatedTask.priority,
        status: updatedTask.status,
        createdAt: updatedTask.created_at,
        updatedAt: updatedTask.updated_at,
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
  taskId: string,
  userId: string
): Promise<DbResult<{ message: string }>> => {
  try {
    const userCategoryIds = await getUserCategoryIds(userId);

    const deletedTask = await TaskModel.findOneAndDelete({
      _id: taskId,
      category_id: { $in: userCategoryIds },
    }).exec();

    if (!deletedTask) {
      return {
        status: "error",
        message: "Task not found or not authorized",
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
