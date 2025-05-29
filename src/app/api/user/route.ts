import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@lib/mongodb';
import User from '@models/user';
import { IUser } from '@/types/user';

// Y aquí es donde las guardo en mongodb
// ... Me tomó unos intentos poder acceder a los params :'v

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const articleBody = await request.json();
        const users: IUser[] = await User.find({'username': articleBody.username})
        if (users.length != 0) return NextResponse.json({ success: false, message: 'El usuario ya existe' }, { status: 400 });
        const user: IUser = await User.create(articleBody);
        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message || "Error unknown" },{ status: 400 });
    }
}
