import mongoose, { Schema, Document } from "mongoose";

// ts interface
export interface IUserDoc extends Document {
    username: string;
    password: string;
    userType: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

// mongoose schema
const userSchema = new Schema<IUserDoc>(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        userType: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dateOfBirth: { type: String, required: true }
    },
    { timestamps: true }
);


export default mongoose.models.User || mongoose.model<IUserDoc>("User", userSchema);