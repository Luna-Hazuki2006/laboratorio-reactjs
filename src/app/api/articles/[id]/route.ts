
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@lib/mongodb';
import Article from '@models/article';
import { IArticle } from '@/types/article';
import { Types } from 'mongoose';

// get an article
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    try {  
        const filter = {_id: new Types.ObjectId(id)};   
        const article: IArticle | null = await Article.findOne(filter);
        if (!article) return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
        return NextResponse.json({ success: true, data: article }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: (error as Error).message || "Error unknown" },{ status: 400 });
    }
}

// edit an article
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    try {
        const body = await request.json();

        const updatedArticle: IArticle | null = await Article.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedArticle) return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    
        return NextResponse.json({ success: true, data: updatedArticle }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: (error as Error).message || "Unknown error" },
            { status: 400 }
        );
    }
}

// delete an article
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    try {
        const deletedArticle: IArticle | null = await Article.findByIdAndDelete(id);
        if (!deletedArticle) return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
        return NextResponse.json({ success: true, message: "Article deleted" }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, message: (error as Error).message || "Unknown error" },
            { status: 400 }
        );
    }
}





