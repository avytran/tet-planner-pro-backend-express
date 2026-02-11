import ShoppingItemModel from "../database/models/shoppingItem.model";
import { ShoppingItem } from "../types/shoppingItem";
import { DbResult } from "../types/dbResult";
import mongoose from "mongoose";

export const getShoppingItemById = async (
    id: string
): Promise<DbResult<ShoppingItem>> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: "error",
        message: "Shopping item not found",
      };
    }
        

        const item = await ShoppingItemModel.findById(id).lean();

        if (!item) {
            return {
                status: "error",
                message: "Shopping item not found",
            };
        }

        return {
            status: "success",
            data: {
                id: item._id.toString(),
                ...item
            },
        };

    } catch (error) {
        return {
            status: "error",
            message: "Internal server error",
        };
    }
};
