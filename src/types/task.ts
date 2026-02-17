import { ObjectId } from "mongodb";

export type Timeline = "Pre Tet" | "During Tet" | "After Tet";
export type Priority = "Low" | "Medium" | "High";
export type TaskStatus = "Todo" | "In Progress" | "Done";

export interface Task {
  id: string;
  categoryId: string;
  title: string;
  duedTime: Date;
  timeline: Timeline;
  priority: Priority;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  category_id: ObjectId;
  title: string;
  dued_time: Date | string;
  timeline: Task["timeline"];
  priority: Task["priority"];
  status: Task["status"];
}

export interface GetTasksFilter {
  category_id?: ObjectId;
  timeline?: Timeline;
  priority?: Priority;
  status?: TaskStatus;
}

export type UpdateTaskInput = Partial<CreateTaskInput>;

export interface TaskForShoppingItem {
  id: string,
  title: string,
}
 