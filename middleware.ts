'use server';

// import { cookies } from "next/headers";
import { getUser, deleteUser, hasUser } from "@lib/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const sesion = await hasUser()
    const data = await getUser()

    console.log('sesion', sesion)
    console.log('data', data);

    console.log('holissssssssss');
    
    

    if (!sesion || data == '') {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

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
   
    return NextResponse.next()

}