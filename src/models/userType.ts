import mongoose, { Schema, Document } from "mongoose";

// ts interface
export interface IUserTypeDoc extends Document {
    name: string;
    description: string;
    userType: number;
}

// mongoose schema
const userTypeSchema = new Schema<IUserTypeDoc>(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
    },
    { timestamps: true }
);


export default mongoose.models.UserType || mongoose.model<IUserTypeDoc>("UserType", userTypeSchema);