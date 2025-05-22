import { NextResponse } from "next/server";
import dbConnect from '@lib/mongodb';
import Article from '@models/article';
import { IArticle } from '@/types/article';

// all articles
export async function GET() {
    await dbConnect();
    try {
        const articles: IArticle[] = await Article.find({}); 
        return NextResponse.json({ success: true, data: articles }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: (error as Error).message || "Error unknown" },{ status: 400 });
    }
}

// create article
export async function POST(request: Request) {
    await dbConnect();
    try {
        const articleBody = await request.json();
        const article: IArticle = await Article.create(articleBody);
        return NextResponse.json({ success: true, data: article }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message || "Error unknown" },{ status: 400 });
    }
}
