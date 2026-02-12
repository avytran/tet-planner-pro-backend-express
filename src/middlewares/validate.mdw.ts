import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Request, Response, NextFunction } from "express";

export default function (schema) {
    return function validate(req: Request, res: Response, next: NextFunction) {
        const ajv = new Ajv({ allErrors: true });
        addFormats(ajv);

        const isValid = ajv.validate(schema, req.body);

        if (!isValid) {
            console.log(ajv.errors);
            return res.status(400).json({
                "status": "error",
                "message": "Invalid shopping item data"
            })
        }

        next();
    }
}