import { Request, Response, NextFunction } from "express";
import {
  createTaskCategory,
  getTaskCategoriesByUserId,
  getTaskCategoryByIdForUser,
  updateTaskCategory,
  deleteTaskCategory,
} from "../services/taskCategory.service";

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
    const user_id = req.query.user_id;

    if (typeof user_id !== "string" || !user_id) {
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

export const getTaskCategoryByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.params.categoryId;
    const user_id = req.query.user_id;

    if (typeof categoryId !== "string" || !categoryId) {
      return res
        .status(400)
        .json({ status: "error", message: "categoryId is required" });
    }

    if (typeof user_id !== "string" || !user_id) {
      return res
        .status(400)
        .json({ status: "error", message: "user_id is required" });
    }

    const taskCategoryResult = await getTaskCategoryByIdForUser(
      user_id,
      categoryId
    );

    if (taskCategoryResult.status === "error") {
      return res.status(500).json(taskCategoryResult);
    }

    if (!taskCategoryResult.data) {
      return res
        .status(404)
        .json({ status: "error", message: "Task category not found" });
    }

    return res.status(200).json(taskCategoryResult);
  } catch (error) {
    return next(error);
  }
};

export const updateTaskCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const user_id = req.query.user_id;
    const { name } = req.body;

    if (typeof categoryId !== "string" || !categoryId) {
      return res
        .status(400)
        .json({ status: "error", message: "categoryId is required" });
    }

    if (typeof user_id !== "string" || !user_id) {
      return res
        .status(400)
        .json({ status: "error", message: "user_id is required" });
    }

    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "name is required" });
    }

    const taskCategoryResult = await updateTaskCategory(user_id, categoryId, {
      name,
    });

    if (taskCategoryResult.status === "error") {
      if (taskCategoryResult.message === "Task category not found") {
        return res.status(404).json(taskCategoryResult);
      }
      return res.status(500).json(taskCategoryResult);
    }

    return res.status(200).json(taskCategoryResult);
  } catch (error) {
    return next(error);
  }
};

export const deleteTaskCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const user_id = req.query.user_id;

    if (typeof categoryId !== "string" || !categoryId) {
      return res
        .status(400)
        .json({ status: "error", message: "categoryId is required" });
    }

    if (typeof user_id !== "string" || !user_id) {
      return res
        .status(400)
        .json({ status: "error", message: "user_id is required" });
    }

    const taskCategoryResult = await deleteTaskCategory(user_id, categoryId);

    if (taskCategoryResult.status === "error") {
      if (taskCategoryResult.message === "Task category not found") {
        return res.status(404).json(taskCategoryResult);
      }
      return res.status(500).json(taskCategoryResult);
    }

    return res.status(200).json({
      status: "success",
      message: "Task category deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};