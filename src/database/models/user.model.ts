import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    email: string;
    password_hash: string;
    full_name: string;
    total_budget: number;
    password_updated_at?: Date;
    created_at: Date;
    updated_at: Date;
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
        },
        password_updated_at: {
            type: Date
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const UserModel: Model<IUser> =
    mongoose.models.User ||
    mongoose.model<IUser>("users", UserSchema);

export default UserModel;