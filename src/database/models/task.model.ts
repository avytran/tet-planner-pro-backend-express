import mongoose, { Schema, Document, Model } from "mongoose";
import { Timeline, Priority, TaskStatus } from "../../types/task";
import { ObjectId } from "mongodb";

export interface ITask extends Document {
  category_id: ObjectId;
  title: string;
  dued_time: Date;
  timeline: Timeline;
  priority: Priority;
  status: TaskStatus;
  created_at: Date;
  updated_at: Date;
}
const TaskSchema: Schema<ITask> = new Schema(
  {
    category_id: {
      type: ObjectId,
      required: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
        },

    dued_time: {
      type: Date,
      required: true,
    },

    timeline: {
      type: String,
      enum: ["Pre Tet", "During Tet", "After Tet"],
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo",
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

const TaskModel: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default TaskModel;