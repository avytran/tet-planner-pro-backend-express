import mongoose, { Model } from "mongoose";
import { ObjectId } from "mongodb";
import BudgetModel from "../database/models/budget.model";

export const checkExistsById = async <T>(
    model: Model<T>,
    id: ObjectId
): Promise<boolean> => {
    const exists = await model.exists({ _id: id });
    return !!exists;
}

export const checkValidId = (id: string): boolean => {
    const isValid = ObjectId.isValid(id);

    return isValid;
}

export const getUserBudgetIds = async (userId: string) => {
  const budgets = await BudgetModel.find(
    { user_id: new mongoose.Types.ObjectId(userId) },
    { _id: 1 }
  );

  return budgets.map(b => b._id);
};