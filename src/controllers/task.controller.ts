import { Request, Response, NextFunction } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  patchTask,
  GetTasksFilter,
  UpdateTaskInput,
} from "../services/task.service";
import { Timeline, Priority, TaskStatus } from "../types/task.types";

export const createTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category_id, title, dued_time, timeline, priority, status } =
      req.body;

    if (
      !category_id ||
      !title ||
      !dued_time ||
      !timeline ||
      !priority ||
      !status
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const validTimelines: Timeline[] = ["Before Tet", "30 Tet", "Mung1", "Mung2", "Mung3"];
    const validPriorities: Priority[] = ["Low", "Medium", "High"];
    const validStatuses: TaskStatus[] = ["Todo", "In Progress", "Done"];

    if (!validTimelines.includes(timeline)) {
      return res.status(400).json({ message: "Invalid timeline value" });
    }

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority value" });
    }
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const task = await createTask({
      category_id,
      title,
      dued_time,
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
    const { category_id, timeline, priority, status } = req.query;

    const filter: GetTasksFilter = {};

    if (typeof category_id === "string") {
      filter.category_id = category_id;
    }

    if (typeof timeline === "string") {
      const validTimelines: Timeline[] = ["Before Tet", "30 Tet", "Mung1", "Mung2", "Mung3"];
      if (!validTimelines.includes(timeline as Timeline)) {
        return res.status(400).json({ message: "Invalid timeline value" });
      }
      filter.timeline = timeline as Timeline;
    }

    if (typeof priority === "string") {
      const validPriorities: Priority[] = ["Low", "Medium", "High"];
      if (!validPriorities.includes(priority as Priority)) {
        return res.status(400).json({ message: "Invalid priority value" });
      }
      filter.priority = priority as Priority;
    }

    if (typeof status === "string") {
      const validStatuses: TaskStatus[] = ["Todo", "In Progress", "Done"];
      if (!validStatuses.includes(status as TaskStatus)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
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
    const { task_id } = req.params;

    const result = await getTaskById(task_id as string);

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
    const { task_id } = req.params;
    const { category_id, title, dued_time, timeline, priority, status } =
      req.body;

    if (
      !category_id ||
      !title ||
      !dued_time ||
      !timeline ||
      !priority ||
      !status
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const validTimelines: Timeline[] = ["Before Tet", "30 Tet", "Mung1", "Mung2", "Mung3"];
    const validPriorities: Priority[] = ["Low", "Medium", "High"];
    const validStatuses: TaskStatus[] = ["Todo", "In Progress", "Done"];

    if (!validTimelines.includes(timeline)) {
      return res.status(400).json({ message: "Invalid timeline value" });
    }

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority value" });
    }

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const result = await updateTask(task_id as string, {
      category_id,
      title,
      dued_time,
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
    const { task_id } = req.params;
    const { category_id, title, dued_time, timeline, priority, status } =
      req.body;

    if (
      category_id === undefined &&
      title === undefined &&
      dued_time === undefined &&
      timeline === undefined &&
      priority === undefined &&
      status === undefined
    ) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const update: UpdateTaskInput = {};

    if (category_id !== undefined) {
      update.category_id = category_id;
    }

    if (title !== undefined) {
      update.title = title;
    }


    if (dued_time !== undefined) {
      update.dued_time = dued_time;
    }

    if (timeline !== undefined) {
      const validTimelines: Timeline[] = ["Before Tet", "30 Tet", "Mung1", "Mung2", "Mung3"];
      if (!validTimelines.includes(timeline)) {
        return res.status(400).json({ message: "Invalid timeline value" });
      }
      update.timeline = timeline;
    }

    if (priority !== undefined) {
      const validPriorities: Priority[] = ["Low", "Medium", "High"];
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({ message: "Invalid priority value" });
      }
      update.priority = priority;
    }

    if (status !== undefined) {
      const validStatuses: TaskStatus[] = ["Todo", "In Progress", "Done"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      update.status = status;
    }

    const result = await patchTask(task_id as string, update);

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
