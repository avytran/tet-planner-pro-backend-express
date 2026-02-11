import { Request, Response, NextFunction } from "express";
import { createTask } from "../services/task.service";
import { Timeline, Priority, TaskStatus } from "../types/task.types";

export const createTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category_id, title, dued_time, timeline, priority, status } = req.body;

    if (!category_id || !title || !dued_time || !timeline || !priority || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const validTimelines: Timeline[] = ["Before Tet", "30 Tet", "Mung1-3"];
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

