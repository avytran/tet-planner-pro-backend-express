import mongoose from "mongoose";
import BudgetModel from "../database/models/budget.model";
import ShoppingItemModel from "../database/models/shoppingItem.model";
import { DbResult } from "../types/dbResult";
import { Budget } from "../types/budget";

export const getBudgetById = async (id: string): Promise<DbResult<Budget>> => {
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
        console.error("getBudgetById error:", error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
}

export const getBudgets = async (userId: string): Promise<DbResult<Array<Budget>>> => {
    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const budgets = await BudgetModel.find({ user_id: userObjectId })

        if (budgets.length === 0) {
            return {
                status: "error",
                message: "Budget not found"
            }
        }

        const budgetIds = budgets.map(b => b._id);

        const summaries = await ShoppingItemModel.aggregate([
            {
                $match: {
                    budget_id: { $in: budgetIds },
                },
            },
            {
                $group: {
                    _id: "$budget_id",
                    total: {
                        $sum: { $multiply: ["$price", "$quantity"] },
                    },
                },
            },
        ]);

        const summaryMap = new Map<string, number>(
            summaries.map(s => [s._id.toString(), s.total])
        )

        const result = budgets.map(budget => (
            {
                id: budget.id.toString(),
                user_id: budget.user_id.toString(),
                name: budget.name,
                allocated_amount: budget.allocated_amount,
                created_at: budget.created_at,
                updated_at: budget.updated_at,
                summary: summaryMap.get(budget._id.toString()) ?? 0
            }
        ));

        return {
            status: "success",
            data: result
        }
    } catch (error) {
        console.error("getBudgets error:", error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
}