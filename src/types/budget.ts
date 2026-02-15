import { ObjectId } from "mongodb"

export interface Budget {
    id: string,
    user_id: string,
    name: string,
    allocated_amount: number,
    created_at: Date,
    updated_at: Date,
    summary?: number
}

export interface BudgetPayload {
    user_id: ObjectId,
    name: string,
    allocated_amount: number
}