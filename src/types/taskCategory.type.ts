import { ObjectId } from "mongodb";

export interface TaskCategory {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskCategoryInput {
  user_id: ObjectId;
  name: string;
}

export interface UpdateTaskCategoryInput {
  name: string;
}