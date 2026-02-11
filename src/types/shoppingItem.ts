export type Timeline = "Before Tet" | "30 Tet" | "Mung 1-3";
export type ShoppingStatus = "Planning" | "Completed";

export interface ShoppingItem {
  id: string;
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
