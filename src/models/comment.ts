import mongoose, { Schema, Document } from "mongoose";

// ts interface
export interface ICommentDoc extends Document {
    content: string;
    publisherName: string;
    publisherId: string;
    articleId: string;
}

// mongoose schema
const commentSchema = new Schema<ICommentDoc>(
    {
        content: { type: String, required: true },
        publisherName: { type: String, required: true },
        publisherId: { type: String, required: true },
        articleId: { type: String, required: true },
    },
    { timestamps: true }
);


export default mongoose.models.Comment || mongoose.model<ICommentDoc>("Comment", commentSchema);