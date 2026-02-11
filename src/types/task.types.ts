export type Timeline = "Before Tet" | "30 Tet" | "Mung1" | "Mung2" | "Mung3";
export type Priority = "Low" | "Medium" | "High";
export type TaskStatus = "Todo" | "In Progress" | "Done";

export interface Task {
  id: string;
  category_id: string;
  title: string;
  dued_time: Date;
  timeline: Timeline;
  priority: Priority;
  status: TaskStatus;
  created_at: Date;
  updated_at: Date;
}