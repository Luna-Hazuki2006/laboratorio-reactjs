"use client"

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Login() {
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    
        const formData = new FormData(event.currentTarget)
        const nombre_usuario = formData.get('nombre_usuario')
        const contraseña = formData.get('contraseña')
    }

    return (
        <main>
            <h1 className="text-center">Iniciar sesión</h1>
            <div className="rounded-2xl border-2 formulario">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre_usuario">Nombre de usuario: </label>
                    <input type="text" name="nombre_usuario" id="nombre_usuario" required />
                    <br />
                    <label htmlFor="contraseña">Contraseña: </label>
                    <input type="password" name="contraseña" id="contraseña" required />
                    <br />
                    <div className="mr-auto ml-auto">
                        <button type="submit">Iniciar sesión</button>
                    </div>
                </form>
                <a href="/register">¿No tienes cuenta? ¡Regístrate!</a>
            </div>
        </main>
    )
}