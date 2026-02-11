import mongoose, { Schema, Document, Model } from "mongoose";
import { Timeline, ShoppingStatus } from "../../types/shoppingItem";
import { v4 as uuidv4 } from "uuid";

export interface IShoppingItem extends Document {
  id: string;
  budget_id: string;
  task_id: string;
  name: string;
  quantity: number;
  price: number;
  dued_time: Date;
  timeline: Timeline;
  status: ShoppingStatus;
  created_at: Date;
  updated_at: Date;
}

const ShoppingItemSchema: Schema<IShoppingItem> = new Schema(
  {
    id: {
      type: String,
      default: () => uuidv4(),
      unique: true,
      index: true,
    },

    budget_id: {
      type: String,
      required: true,
    },

    task_id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    dued_time: {
      type: Date,
      required: true,
    },

    timeline: {
      type: String,
      enum: ["BeforeTet", "30Tet", "Mung1-3"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Planning", "Completed"],
      default: "Planning",
    },
  },
  {
    timestamps: true, 
  }
);

const ShoppingItemModel: Model<IShoppingItem> =
  mongoose.models.ShoppingItem ||
  mongoose.model<IShoppingItem>("ShoppingItem", ShoppingItemSchema);

export default ShoppingItemModel;
