import mongoose, { Schema, Document } from "mongoose";

// ts interface
export interface IArticle extends Document {
    title: string;
    content: string;
    source: string;
    category: string;
    date: string;
    idPublisher: string;
    imgUrl: string;
  }

  // mongoose schema
const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    source: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    idPublisher: { type: String, required: true },
    imgUrl: { type: String, required: false },
  },
  { timestamps: true }
);


export default mongoose.models.Article || mongoose.model<IArticle>("Article", articleSchema);