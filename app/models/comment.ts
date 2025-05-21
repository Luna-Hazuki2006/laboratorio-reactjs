import mongoose, { Schema, Document } from "mongoose";

// ts interface
export interface IComment extends Document {
    content: string;
    publisherId: string;
    articleId: string;
  }


// mongoose schema
const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    publisherId: { type: String, required: true },
    articleId: { type: String, required: true },
  },
  { timestamps: true }
);


export default mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);