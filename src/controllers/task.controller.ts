import { Request, Response, NextFunction } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  patchTask,
  deleteTask,
} from "../services/task.service";
import { Timeline, Priority, TaskStatus } from "../types/task";
import { checkValidId } from "../utils/db.util";
import { GetTasksFilter, UpdateTaskInput } from "../types/task";
import mongoose from "mongoose";

export const createTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId, title, duedTime, timeline, priority, status } =
      req.body;

    if (!checkValidId(categoryId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
      })
    }

    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

    const task = await createTask({
      category_id: categoryObjectId,
      title,
      dued_time: duedTime,
      timeline,
      priority,
      status,
    });

    if (task.status === "error") {
      return res.status(500).json(task);
    }

    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
};

export const getTasksHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId, timeline, priority, status } = req.query;

    const filter: GetTasksFilter = {};

    if (categoryId) {
      filter.category_id = new mongoose.Types.ObjectId(categoryId as string);
    }

    if (timeline) {
      filter.timeline = timeline as Timeline;
    }

    if (priority) {
      filter.priority = priority as Priority;
    }

    if (status) {
      filter.status = status as TaskStatus;
    }

    const result = await getTasks(filter);

    if (result.status === "error") {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const getTaskByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!checkValidId(id as string)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
      });
    }

    const result = await getTaskById(id as string);
    
    if (result.status === "error") {
      return res.status(500).json(result);
    }

    if (!result.data) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const updateTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { categoryId, title, duedTime, timeline, priority, status } =
      req.body;

    if (!checkValidId(id as string) || !checkValidId(categoryId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
      });
    }

    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

    const result = await updateTask(id as string, {
      category_id: categoryObjectId,
      title,
      dued_time: duedTime,
      timeline,
      priority,
      status,
    });

    if (result.status === "error") {
      return res.status(500).json(result);
    }

    if (!result.data) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const patchTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { categoryId, title, duedTime, timeline, priority, status } =
      req.body;

    if (!checkValidId(id as string) || (categoryId && !checkValidId(categoryId as string))) {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
      });
    }

    const update: UpdateTaskInput = {};

    if (categoryId) {
      const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
      update.category_id = categoryObjectId;
    }

    if (title) {
      update.title = title;
    }

    if (duedTime) {
      update.dued_time = duedTime;
    }

    if (timeline) {
      update.timeline = timeline;
    }

    if (priority) {
      update.priority = priority;
    }

    if (status) {
      update.status = status;
    }

    const result = await patchTask(id as string, update);

    if (result.status === "error") {
      return res.status(500).json(result);
    }

    if (!result.data) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!checkValidId(id as string)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
      });
    }

    const result = await deleteTask(id as string);
    if (result.status === "error") {
      return res.status(500).json(result);
    }
    
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};