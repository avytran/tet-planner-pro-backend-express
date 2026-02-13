import { Request, Response } from "express";
import { getBudgetById } from "../services/budget.service";

export const getBudgetByIdController = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
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