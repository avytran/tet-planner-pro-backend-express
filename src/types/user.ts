export interface User {
    id: string;
    email: string;
    passwordHash: string;
    fullName: string;
    totalBudget: number;
    passwordUpdatedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserTotalBudget {
    totalBudget: number;    
}