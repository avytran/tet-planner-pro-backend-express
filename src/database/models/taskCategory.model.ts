import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITaskCategory extends Document {
  user_id: string;
  name: string;
}

const TaskCategorySchema: Schema<ITaskCategory> = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model<ITaskCategory>("task_categories", TaskCategorySchema);