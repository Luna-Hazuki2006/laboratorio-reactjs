import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@lib/mongodb';
import User from '@models/user';
import { IUser } from '@/types/user';

// Y aquí es donde las guardo en mongodb
// ... Me tomó unos intentos poder acceder a los params :'v

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string, password: string }> }) {
    await dbConnect();
    const { username, password } = await params
    // const { page, limit } = query;
    // const { username, password } = useParams()
    try {
        const user: IUser[] = await User.find({'username': username, 'password': btoa(password as string)}); 
        if (user.length == 0) return NextResponse.json({ success: false, message: "El usuario no existe" },{ status: 400 });
        return NextResponse.json({ success: true, data: user[0] }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: (error as Error).message || "Error unknown" },{ status: 400 });
    }
}

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
