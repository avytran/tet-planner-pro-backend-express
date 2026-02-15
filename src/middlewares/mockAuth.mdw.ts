import { Request, Response, NextFunction } from "express";

export const mockAuth = (req: Request, res: Response, next: NextFunction) => {
    req.user = {
        id: "65f1a2b3c4d5e6f789300002",
        email: "user1@gmail.com",
    };

    next();
}