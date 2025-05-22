import { NextResponse } from "next/server";
import dbConnect from '@lib/mongodb';
import Comment from '@models/comment';
import { IComment } from '@/types/comment';

// get comments (si no esta articleId en el query trae todo)
export async function GET(request: Request) {
    await dbConnect();
    
    //query
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');

    try {
        const filter = articleId ? { articleId } : {};
        const comments: IComment[] = await Comment.find(filter); 
        return NextResponse.json({ success: true, data: comments }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: (error as Error).message || "Error unknown" },{ status: 400 });
    }
}

// create comment
export async function POST(request: Request) {
    await dbConnect();
    try {
        const comment = await request.json();
        await Comment.create(comment);
        return NextResponse.json({ success: true, data: comment }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message || "Error unknown" },{ status: 400 });
    }
}
