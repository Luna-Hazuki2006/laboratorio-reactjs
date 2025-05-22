'use server';

import { cookies } from 'next/headers'

export async function storeUser(user: string) {
    const cookieStore = await cookies()
    cookieStore.set("user", user, {maxAge: 90000, httpOnly: true, secure: true});
}

export async function getUser() {
    const cookieStore = await cookies()
    return cookieStore.get('user');
}

export async function deleteUser() {
    const cookieStore = await cookies()
    cookieStore.delete('user')
}