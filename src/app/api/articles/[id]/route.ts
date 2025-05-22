
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@lib/mongodb';
import Article from '@models/article';

// get an article
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    await dbConnect();
    try {     
        const article = await Article.findOne({id});
        if (!article) return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
        return NextResponse.json({ success: true, data: article }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: (error as Error).message || "Error unknown" },{ status: 400 });
    }
}

// edit an article
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await dbConnect();
  try {
    const body = await request.json();

    const updatedArticle = await Article.findByIdAndUpdate(id, body, {
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
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await dbConnect();
  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Article deleted" }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Unknown error" },
      { status: 400 }
    );
  }
}





