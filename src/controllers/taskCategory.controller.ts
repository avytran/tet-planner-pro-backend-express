import { Request, Response, NextFunction } from "express";
import {
  createTaskCategory,
  getTaskCategoriesByUserId,
  getTaskCategoryByIdForUser,
  updateTaskCategory,
  deleteTaskCategory,
} from "../services/taskCategory.service";
import { checkValidId } from "../utils/db.util";
import mongoose from "mongoose";

export const createTaskCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    if (!checkValidId(userId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
      })
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const result = await createTaskCategory({
      user_id: userObjectId,
      name
    });

    if (result.status === "error") {
      return res.status(500).json(result);
    }

    return res.status(201).json(result);
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
    const userId = req.user.id;

    if (!checkValidId(userId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
      })
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const result = await getTaskCategoriesByUserId(userObjectId);

    if (result.status === "error") {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
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
    const categoryId = req.params.id as string;
    const userId = req.user.id;

    if (!checkValidId(userId) || !checkValidId(categoryId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
      })
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

    const result = await getTaskCategoryByIdForUser(
      userObjectId,
      categoryObjectId
    );

    if (result.status === "error") {
      if (result.message === "Task category not found") {
        return res.status(404).json(result);
      }
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
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
    const categoryId = req.params.id as string;
    const userId = req.user.id;
    const { name } = req.body;

    if (!checkValidId(userId) || !checkValidId(categoryId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
      })
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

    const taskCategoryResult = await updateTaskCategory(userObjectId, categoryObjectId, {
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
    const categoryId = req.params.id as string;
    const userId = req.user.id;

    if (!checkValidId(userId) || !checkValidId(categoryId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
      })
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

    const taskCategoryResult = await deleteTaskCategory(userObjectId, categoryObjectId);

    if (taskCategoryResult.status === "error") {
      if (taskCategoryResult.message === "Task category not found") {
        return res.status(404).json(taskCategoryResult);
      }
      return res.status(500).json(taskCategoryResult);
    }

    return res.status(200).json({
      status: "success",
      data: {
        message: "Task category deleted successfully"
      },
    });
  } catch (error) {
    return next(error);
  }
};