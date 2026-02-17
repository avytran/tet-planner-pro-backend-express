import UserModel from "../database/models/user.model";
import { DbResult } from "../types/dbResult";
import { UserTotalBudget } from "../types/user";

export const getTotalBudgetOfUser = async (userId: string): Promise<DbResult<UserTotalBudget>> => {
    try {
        const user = await UserModel.findById(userId).select("total_budget").lean();

        if (!user) {
            return {
                status: "error",
                message: "User not found",
            };
        }

        return {
            status: "success",
            data: {
                totalBudget: user.total_budget
            }
        }
    } catch (error) {
        console.error("getTotalBudgetOfUser error:", error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
}

export const updateTotalBudgetOfUser = async (userId: string, totalBudget: number): Promise<DbResult<UserTotalBudget>> => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { total_budget: totalBudget },
            { new: true }
        )
            .select("total_budget")
            .lean();

        if (!updatedUser) {
            return {
                status: "error",
                message: "User not found",
            };
        }

        return {
            status: "success",
            data: {
                totalBudget: updatedUser.total_budget,
            },
        };
    } catch (error) {
        console.error("updateTotalBudgetOfUser error:", error);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
}