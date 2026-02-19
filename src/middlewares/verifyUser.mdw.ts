import { Request, Response, NextFunction } from "express";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const authUserId = req.user.sub;
    const pathUserId = req.params.userId;

    if (authUserId !== pathUserId) {
        return res.status(403).json({
            status: "error",
            message: "Cannot access another user's resources"
        })
    }

    next();
}