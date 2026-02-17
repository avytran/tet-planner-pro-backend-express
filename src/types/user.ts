export interface User {
    id: string,
    email: string,
    passwordHash: string,
    fullName: string,
    totalBudget: number,
    createdAt: Date,
}

export interface UserTotalBudget {
    totalBudget: number    
}