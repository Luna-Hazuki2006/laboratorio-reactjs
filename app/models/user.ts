import mongoose, { Schema, Document } from "mongoose";

// ts interface
export interface IUser extends Document {
    username: string;
    password: string;
    userType: number;
    firstName: string;
    lastName: string;
}

// mongoose schema
const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        userType: { type: Number, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    { timestamps: true }
);


export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);