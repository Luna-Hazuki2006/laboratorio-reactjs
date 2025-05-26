import { NextResponse } from "next/server";
import dbConnect from '@lib/mongodb';
import User from '@models/user';
import { IUser } from '@/types/user';


export async function GET(username : string, password : string) {
    await dbConnect();
    try {
        const user: IUser = await User.findOne({'username': username, 'password': password})!; 
        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: (error as Error).message || "Error unknown" },{ status: 400 });
    }
}

// create article
export async function POST(request: Request) {
    await dbConnect();
    try {
        const articleBody = await request.json();
        const user: IUser = await User.create(articleBody);
        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message || "Error unknown" },{ status: 400 });
    }
}
