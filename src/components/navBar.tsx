'use client';
import React from 'react';

// ------------------ Adecuar navbar a tipos de usuario cuando ya esté hecha la autenticación 

export default function NavBar() {
    return (
        <nav className="bg-gray-100">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://noticias.com/" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">Noticias™</span>
                </a>
                <div className="hidden w-full md:block md:w-auto">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0"> 
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-black rounded-sm hover:text-amber-400 md:p-0"
                            >
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 rounded-sm hover:text-amber-400 md:p-0"
                            >
                                Crear artículo
                            </a>
                        </li>
                    </ul>
                </div>
                <a href="/login">
                    <button type="button" className="text-white bg-amber-400 hover:bg-amber-500 font-medium rounded-lg text-sm px-4 py-2 text-center ">Inicia sesión</button>
                </a>
            </div>
        </nav>
    );
}
