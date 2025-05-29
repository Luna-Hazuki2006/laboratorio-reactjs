"use server";

import { cookies } from 'next/headers'

// Aquí es donde hago las cookies
// Si
export async function storeUser(user: string) {
    const cookieStore = await cookies()
    cookieStore.set({
        name: 'user',
        value: user, 
        secure: true, 
        sameSite: 'strict', 
        path: '/', 
        maxAge: 300000 
    })
    // Tal vez use esto después si este otro falla
    // const expiresAt = new Date(Date.now() + 900000) as Date
}

export async function getUser() {
    const cookieStore = await cookies();
    return cookieStore.get('user')?.value;
}

export async function hasUser() {
    const cookieStore = await cookies();
    return cookieStore.has('user')
}

export async function deleteUser() {
    const cookieStore = await cookies();
    cookieStore.delete('user');
}