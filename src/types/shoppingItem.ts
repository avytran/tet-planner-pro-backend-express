import { ObjectId } from "mongodb";

export type Timeline = "Before Tet" | "30 Tet" | "Mung 1-3";
export type ShoppingStatus = "Planning" | "Completed";

export interface ShoppingItem {
  id: ObjectId;
  budget_id: string;
  task_id: string;
  name: string;
  price: number;
  status: ShoppingStatus;
  quantity: number;
  dued_time: Date;
  timeline: Timeline;
  created_at: Date;
  updated_at: Date;
}

export interface ShoppingItemQuery {
  category?: string;
  timeline?: string;
  budget_id?: string;
  task_id?: string;
  dueDate?: string;
  status?: string;
  keyword?: string;
  sort_by?: string;
  sort_order?: string;
  page?: number;
  page_size?: number;
}