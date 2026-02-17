import { Request, Response } from "express";
import { checkValidId } from "../utils/db.util";
import { getTotalBudgetOfUser } from "../services/user.service";

export const getTotalBudgetOfUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        if (!checkValidId(userId)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid ID format",
            })
        }

        const result = await getTotalBudgetOfUser(userId);

        if (result.status === "error") {
            if (result.message === "User not found") {
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