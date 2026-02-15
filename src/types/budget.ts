import { ObjectId } from "mongodb"

export interface Budget {
    id: string,
    userId: string,
    name: string,
    allocatedAmount: number,
    createdAt: Date,
    updatedAt: Date,
    summary?: number
}

export interface BudgetPayload {
    userId: ObjectId,
    name: string,
    allocatedAmount: number
}