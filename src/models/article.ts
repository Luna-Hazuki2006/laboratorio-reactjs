import mongoose, { Schema, Document } from "mongoose";

// ts interface
export interface IArticleDoc extends Document {
    title: string;
    content: string;
    source: string;
    category: string;
    date: string;
    namePublisher: string;
    idPublisher: string;
    imgUrl: string;
}

  // mongoose schema
const articleSchema = new Schema<IArticleDoc>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        source: { type: String, required: true },
        category: { type: String, required: true },
        date: { type: String, required: true },
        namePublisher: { type: String, required: true },
        idPublisher: { type: String, required: true },
        imgUrl: { type: String, required: false },
    },
    { timestamps: true }
);


export default mongoose.models.Article || mongoose.model<IArticleDoc>("Article", articleSchema);