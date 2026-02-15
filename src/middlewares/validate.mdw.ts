import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Request, Response, NextFunction } from "express";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export default function (schema) {
    return function validate (req: Request, res: Response, next: NextFunction) {
        const value = Object.keys(req.query).length === 0 ? req.body : req.query;

        const isValid = ajv.validate(schema, value);

        if (!isValid) {
            console.log(ajv.errors);
            return res.status(400).json({
                "status": "error",
                "message": "Invalid input data"
            })
        }

        next();
    }
}