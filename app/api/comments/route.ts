import { NextResponse } from "next/server";
import dbConnect from '@lib/mongodb';
import Comment from '@models/comment';

// all comments
export async function GET() {
  await dbConnect();
  try {
    const comments = await Comment.find({}); 
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
