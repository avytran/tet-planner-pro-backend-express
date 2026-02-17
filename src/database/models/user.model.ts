import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    email: string,
    password_hash: string,
    full_name: string,
    total_budget: number,
    created_at: Date,
}

const UserSchema: Schema<IUser> = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password_hash: {
            type: String,
            required: true
        },
        full_name: {
            type: String,
            required: true
        },
        total_budget: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
        },
    }
);

const UserModel: Model<IUser> =
    mongoose.models.User ||
    mongoose.model<IUser>("users", UserSchema);

export default UserModel;