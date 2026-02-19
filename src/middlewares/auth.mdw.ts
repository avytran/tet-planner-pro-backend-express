import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getSigningKey } from "../config/jwksClient";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            status: "error",
            message: "Missing token"
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, getSigningKey, { algorithms: ["RS256"] }, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: "error",
                message: "Invalid token"
            });
        }
        console.log(decoded);
        
        req.user = decoded;
        next();
    })
}