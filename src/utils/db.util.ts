import { Model } from "mongoose";
import { ObjectId } from "mongodb";

export const checkExistsById = async <T>(
    model: Model<T>,
    id: ObjectId
): Promise<boolean> => {
    const exists = await model.exists({ _id: id });
    return !!exists;
}

export const checkValidId = (id: string): boolean => {
    const isValid = ObjectId.isValid(id);

    return isValid;
}