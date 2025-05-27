'use client';

import { useRouter } from 'next/navigation';
import { DetailedHTMLProps, ReactEventHandler, SelectHTMLAttributes, useState } from 'react';

export default function Register() {

    const empty_user = {
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        password_again: '',
        userType: '', 
        dateOfBirth: ''
    }

    const [message, setMessage] = useState('');
    const [form, setForm] = useState(empty_user);
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }; 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formulario = e.target as HTMLFormElement
        const datos = new FormData(formulario);
        setMessage('Registando usuario');
        if (datos.get('password') != datos.get('password_again')) {
            setMessage('Las contraseñas deben ser iguales')
            setForm(empty_user)
            return
        }
        console.log(form);
        
        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: datos.get('username'),
                    firstName: datos.get('firstName'),
                    lastName: datos.get('lastName'),
                    password: btoa(datos.get('password')?.toString()!),
                    dateOfBirth: datos.get('dateOfBirth'), 
                    userType: datos.get('userType')
                })
            });

            const data = await res.json();

            if (data.success) {
                setMessage('Usuario registrado exitosamente');
                setForm(empty_user);
                router.push('/login')
            } else {
                setMessage('Error: ' + data.message);
            }
        } catch (error) {
            console.log('Error registrando al usuario', error);
            setMessage('Error al registrar al usuario');
        } 
    };

    return (
        <main>
            <h1 className="text-center">Registrar usuario</h1>
            {message && <p>{message}</p>}
            <div className="rounded-2xl border-2 formulario">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Nombre de usuario: </label>
                    <input type="text" name="username" id="username" onChange={handleChange} required />
                    <br />
                    <label htmlFor="firstName">Nombres: </label>
                    <input type="text" name="firstName" id="firstName" onChange={handleChange} required />
                    <br />
                    <label htmlFor="lastName">Apellidos: </label>
                    <input type="text" name="lastName" id="lastName" onChange={handleChange} required />
                    <br />
                    <label htmlFor="dateOfBirth">Fecha de nacimiento: </label>
                    <input type="date" name="dateOfBirth" id="dateOfBirth" onChange={handleChange} required />
                    <br />
                    <label htmlFor="password">Contraseña: </label>
                    <input type="password" name="password" id="password" onChange={handleChange} required />
                    <br />
                    <label htmlFor="password_again">Contraseña (de nuevo): </label>
                    <input type="password" name="password_again" id="password_again" onChange={handleChange} required />
                    <label htmlFor="userType">Tipo de usuario: </label>
                    <select name="userType" id="userType" required>
                        <option value="lector">Lector</option>
                        <option value="autor">Autor</option>
                    </select>
                    <br />
                    <button type="submit">Registrar</button>
                </form>
                <a href="/login">¿Ya tienes cuenta? ¡Inicia sesión!</a>
            </div>
        </main>
    )
}