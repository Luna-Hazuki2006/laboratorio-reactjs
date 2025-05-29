"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { storeUser } from "@lib/cookies";

import { hasUser } from "@lib/cookies";
import { redirect } from 'next/navigation';

export default function Login() {
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [user, setUser] = useState(true)
// ¿Qué tal?
// Profe, la función de abajo fue la que usted me ayudó :D
// Si
// Esto se usa para guardar el usuario en las cookies
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const nombre_usuario = formData.get('nombre_usuario')?.toString()!
        const clave = formData.get('clave')?.toString()!
        try {
            const res = await fetch('/api/user/?' + new URLSearchParams({
                username: nombre_usuario, 
                password: clave
            }), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({
                //     username: nombre_usuario,
                //     password: clave
                // })
            });

            const data = await res.json();
            if (data.success) {
                console.log(data.data);
                setMessage('Has iniciado sesión correctamente');
                await storeUser(JSON.stringify(data.data))
                router.push('/')
            } else {
                setMessage('Error: ' + data.message);
            }
        } catch (error) {
            console.log('Error al iniciar sesión', error);
            setMessage('Error al iniciar sesión');
        } 
    }

    useEffect(() => {
        async function buscar() {
            const has = await hasUser();
            setUser(has);
        }
        buscar();
    }, []);

    // if (user) redirect('/home');
    return (
        <main>
            <h1 className="text-center">Iniciar sesión</h1>
            {message && <p>{message}</p>}
            <div className="rounded-2xl border-2 formulario">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre_usuario">Nombre de usuario: </label>
                    <input type="text" name="nombre_usuario" id="nombre_usuario" required />
                    <br />
                    <label htmlFor="clave">clave: </label>
                    <input type="password" name="clave" id="clave" required />
                    <br />
                    <div className="mr-auto ml-auto">
                        <button type="submit">Iniciar sesión</button>
                    </div>
                </form>
                <div>
                    <a href="/register">¿No tienes cuenta? ¡Regístrate!</a>
                </div>
            </div>
        </main>
    )
}