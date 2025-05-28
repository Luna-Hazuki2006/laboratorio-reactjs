'use client';
import { deleteUser, getUser, hasUser } from '@lib/cookies';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// ------------------ Adecuar navbar a tipos de usuario cuando ya esté hecha la autenticación 

export default function NavBar() {

    const vacio = {
        _id: '', 
        username: '', 
        firstName: '', 
        lastName: '', 
        password: '', 
        dateOfBirth: '', 
        userType: '', 
        createdAt: '', 
        updatedAt: ''
    }

    const [user, setUser] = useState(vacio)
    const [has, setHas] = useState(false)

    async function buscar() {
        const verdad = await hasUser()
        setHas(verdad)
        if (verdad) {
            const usuario = await getUser()
            setUser(JSON.parse(usuario!))
        } else {
            setUser(vacio)
            if (location.pathname != '/register') redirect('/login')
        }
    }

    // useEffect(() => {
    //     buscar()
    // }, [])

    useEffect(() => {
        buscar()
    }, [has])

    const ClickHandler = async () => {
        await deleteUser()
        setHas(false)
        setUser(vacio)
        redirect('/login')
    }

    return (
        <nav className="bg-gray-100">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                        Buenas, {user['firstName']} {user['lastName']}
                    </span>
                </a>
                <div className="hidden w-full md:block md:w-auto">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0"> 
                        <li>
                            <a
                                href="/home"
                                className="block py-2 px-3 text-black rounded-sm hover:text-amber-400 md:p-0"
                            >
                                Inicio
                            </a>
                        </li>
                        {
                            (user['userType'] == 'autor') ? 
                            (<li>
                                <a
                                    href="/article/create"
                                    className="block py-2 px-3 rounded-sm hover:text-amber-400 md:p-0"
                                >
                                    Crear artículo
                                </a>
                            </li>)
                            : 
                            <></>
                        }
                    </ul>
                </div>
                {
                    (has) ? 
                    (
                        <button onClick={ClickHandler} type="button" className="text-white bg-amber-400 hover:bg-amber-500 font-medium rounded-lg text-sm px-4 py-2 text-center ">Cerrar sesión</button>
                    ) 
                    : 
                    (
                        <>
                            <a href="/login">
                                <button type="button" className="text-white bg-amber-400 hover:bg-amber-500 font-medium rounded-lg text-sm px-4 py-2 text-center ">Inicia sesión</button>
                            </a>
                            <a href="/register">
                                <button type="button" className="text-white bg-amber-400 hover:bg-amber-500 font-medium rounded-lg text-sm px-4 py-2 text-center ">Registrar usuario</button>
                            </a>
                        </>
                    )
                }
            </div>
        </nav>
    );
}
