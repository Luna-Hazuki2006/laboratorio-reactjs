import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@lib/mongodb';
import User from '@models/user';
import { IUser } from '@/types/user';


export async function POST(request: NextRequest) {
    await dbConnect();
    // const { page, limit } = query;
    // const { username, password } = useParams()
    try {
        const usuario = await request.json();
        const user: IUser[] = await User.find({'username': usuario.username, 'password': btoa(usuario.password as string)}); 
        if (user.length == 0) return NextResponse.json({ success: false, message: "El usuario no existe" },{ status: 400 });
        return NextResponse.json({ success: true, data: user[0] }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: (error as Error).message || "Error unknown" },{ status: 400 });
    }
}