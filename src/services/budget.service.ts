import mongoose from "mongoose";
import BudgetModel from "../database/models/budget.model";
import ShoppingItemModel from "../database/models/shoppingItem.model";
import { Budget } from "../types/budget";

export const getBudgetById = async (id: string) => {
    try {
        const [budget, items] = await Promise.all([
            BudgetModel.findById(id).exec(),
            ShoppingItemModel.find({ budget_id: new mongoose.Types.ObjectId(id) })
        ])

        if (!budget) {
            return {
                status: "error",
                message: "Budget not found"
            }
        }

        const summary = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        return {
            status: "success",
            data: {
                id: budget.id.toString(),
                user_id: budget.user_id.toString(),
                name: budget.name,
                allocated_amount: budget.allocated_amount,
                created_at: budget.created_at,
                updated_at: budget.updated_at,
                summary
            }
        }
    } catch (error) {
        console.error("getShoppingItemById error:", error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
}