import { Request, Response, NextFunction } from "express";
import { createTaskCategory, getTaskCategoriesByUserId } from "../services/taskCategory.service";

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

export const getTaskCategoriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.query;

    if (!user_id || typeof user_id !== "string") {
      return res.status(400).json({ 
        status: "error", 
        message: "user_id is required" 
      });
    }

    const taskCategoriesResult = await getTaskCategoriesByUserId(user_id);

    if (taskCategoriesResult.status === "error") {
      return res.status(500).json(taskCategoriesResult);
    }

    return res.status(200).json(taskCategoriesResult);
  } catch (error) {
    return next(error);
  }
};