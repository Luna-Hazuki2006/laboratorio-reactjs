// 'use server';

// import { cookies } from "next/headers";
// import { getUser, deleteUser, hasUser } from "@lib/cookies";
// import { NextRequest, NextResponse } from "next/server";

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // const { pathname } = request.nextUrl;
    // Define the paths that need protection
    // if (pathname == '/') {
    //     const token = request.cookies.get('ofjwopej'); // Check for auth token in cookies
    //     // If the token is not present, redirect to the login page
    //     if (!token) {
            
    //     }
    // }
    // If the user is authenticated, continue with the request
    let cookie = request.cookies.get('user')
    console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
    const allCookies = request.cookies.getAll()
    console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
    
    request.cookies.has('user') // => true
    request.cookies.delete('user')
    request.cookies.has('user') // => false
    
    // Setting cookies on the response using the `ResponseCookies` API
    const response = NextResponse.next()
    response.cookies.set('user', 'noooooooooooo')
    response.cookies.set({
        name: 'user',
        value: 'nooooooooooooooo',
        path: '/',
    })
    cookie = response.cookies.get('user')
    console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
    // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.
    
    return response

// export async function middleware(request: NextRequest) {

//     const sesion = await hasUser()
//     const data = await getUser()

//     console.log('sesion')
//     console.log(sesion);
//     console.log('data');
//     console.log(data);
    

//     console.log('holissssssssss');
    
    

//     if (!sesion || data == '') {
//         const url = request.nextUrl.clone()
//         url.pathname = '/login'
//         return NextResponse.redirect(url)
//     }

    // if (request.nextUrl.pathname.includes('/login')) {
    //     const url = request.nextUrl.clone()
    //     url.pathname = '/'
    //     if (sesion && data != '' && data != undefined) {
    //         return NextResponse.redirect(url)
            
    //     } else return NextResponse.next()
    // } else if (request.nextUrl.pathname == '/') {
    //     const url = request.nextUrl.clone()
    //     url.pathname = '/login'
    //     if (data == '' || data == undefined) {
    //         return NextResponse.redirect(url)
    //     } else return NextResponse.next()
    // }

    // //si no esta autenticado o el token vencio en api
    // // const session = await getUser();
    // // const response = await fetch(`http://${process.env.NEXT_PUBLIC_API}/authenticated` as string, {
    // //     method: "GET",
    // //     credentials: "include",
    // //     headers: {
    // //       Authorization: session as string,
    // //       "Content-Type": "application/json",
    // //     },
    // //   });
      
    // // if (!response.ok) {
        
    // //     if (response.statusText === "Unauthorized"){
    // //         console.log("Response de la api UNAUTHORIZED")
    // await deleteUser();
    // const url = request.nextUrl.clone()
    // url.pathname = '/login'
    // NextResponse.redirect(url);
        // }
    // }
   
//     return NextResponse.next()

}