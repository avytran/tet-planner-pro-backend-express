import mongoose, { Schema, Document, Model } from "mongoose";
import { ObjectId } from "mongodb";

export interface ITaskCategory extends Document {
  user_id: ObjectId;
  name: string;
  created_at: Date;
  updated_at: Date;
}

const TaskCategorySchema: Schema<ITaskCategory> = new Schema(
  {
    user_id: {
      type: ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model<ITaskCategory>("task_categories", TaskCategorySchema);