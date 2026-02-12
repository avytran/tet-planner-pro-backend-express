import { Request, Response, NextFunction } from "express";
import { createTaskCategory } from "../services/taskCategory.service";

export const createTaskCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, name } = req.body;

    if (!user_id || !name) {
      return res.status(400).json({ status: "error", message: "Invalid task category data" });
    }

    const taskCategoryResult = await createTaskCategory({
      user_id,
      name
    });

    if (taskCategoryResult.status === "error") {
      return res.status(500).json(taskCategoryResult);
    }

    return res.status(201).json(taskCategoryResult);
  } catch (error) {
    return next(error);
  }
};