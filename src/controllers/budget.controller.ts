import { Request, Response } from "express";
import { getBudgetById, getBudgets, deleteBudget, createBudget, updateBudget } from "../services/budget.service";
import { checkValidId } from "../utils/db.util";

export const getBudgetByIdController = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
        if (!checkValidId(id)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid ID format",
            })
        }

        const result = await getBudgetById(id);

        if (result.status === "error") {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Controller error:", error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
}

export const getBudgetsController = async (req: Request, res: Response) => {
    const { id } = req.user;

    try {
        if (!checkValidId(id)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid ID format",
            })
        }

        const result = await getBudgets(id);

        if (result.status === "error") {
            if (result.message === "Budget not found") {
                return res.status(404).json(result);
            }
            return res.status(500).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Controller error:", error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
}

export const deleteBudgetController = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
        if (!checkValidId(id)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid ID format",
            })
        }

        const result = await deleteBudget(id);

        if (result.status === "error") {
            if (result.message === "Budget not found") {
                return res.status(404).json(result);
            }
            return res.status(500).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Controller error:", error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
}

export const createBudgetController = async (req: Request, res: Response) => {
    const { name, allocated_amount } = req.body;
    const user_id = req.user.id;

    try {
        if (!checkValidId(user_id)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid ID format",
            })
        }

        const result = await createBudget({ user_id, name, allocated_amount });

        if (result.status === "error") {
            return res.status(500).json(result);
        }

        return res.status(201).json(result);
    } catch (error) {
        console.error("Controller error:", error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
}

export const updateBudgetController = async (req: Request, res: Response) => {
    const { name, allocated_amount } = req.body;
    const user_id = req.user.id;
    const budget_id = req.params.id as string;

    try {
        if (!checkValidId(user_id) || !checkValidId(budget_id)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid ID format",
            })
        }

        const result = await updateBudget(budget_id, { user_id, name, allocated_amount });

        if (result.status === "error") {
            if (result.message === "Budget not found") {
                return res.status(404).json(result);
            }
            return res.status(500).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Controller error:", error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
}