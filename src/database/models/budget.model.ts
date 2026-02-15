import mongoose, { Schema, Document, Model } from "mongoose";
import { ObjectId } from "mongodb";

export interface IBudget extends Document {
    user_id: ObjectId,
    name: string,
    allocated_amount: number,
    created_at: Date,
    updated_at: Date,
};

const BudgetSchema: Schema<IBudget> = new Schema(
    {
        user_id: {
            type: ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        allocated_amount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const BudgetModel: Model<IBudget> = 
    mongoose.models.Budget ||
    mongoose.model<IBudget>("budgets", BudgetSchema);

export default BudgetModel;