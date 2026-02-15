import { Request, Response } from "express";
import { getBudgetById, getBudgets } from "../services/budget.service";
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