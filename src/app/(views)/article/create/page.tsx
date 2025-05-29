'use client';

import { hasUser, getUser } from "@lib/cookies";
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IUser } from '@/types/user';
import Swal from 'sweetalert2'


export default function CreateArticlePage() {
    const [mostrar, setMostrar] = useState(false);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(true)
    const [userData, setUserData] = useState<IUser>();
    const [form, setForm] = useState({
        title: '',
        content: '',
        source: '',
        category: '',
        date: '',
        namePublisher: '',
        idPublisher: '',
        imgUrl: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }; 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Creando articulo');

        try {
            const res = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...form,
                idPublisher: userData?._id,
                namePublisher: userData?.firstName,})
            });

            const data = await res.json();

        if (data.success) {
            setMessage('Articulo creado exitosamente');
            setForm({
                title: '',
                content: '',
                source: '',
                category: '',
                date: '',
                namePublisher: '',
                idPublisher: '',
                imgUrl: ''
            });
        } else {
            setMessage('Error: ' + data.message);
        }
        } catch (error) {
            console.log('Error creando artículo', error);
            setMessage('Error al crear el articulo');
        } 
    };

    useEffect(() => {
        async function buscar() {
            const has = await hasUser();
            setUser(has);

            if (!has) {
                Swal.fire({
                    title: 'Inicia sesión para tener acceso.',
                    allowOutsideClick: false,
                }).then(() => {
                    redirect('/login');
                });
                return;
            }

       
            const data = await getUser();
            const dataObj: IUser = JSON.parse(data!);
            setUserData(dataObj);

            if (dataObj.userType !== 'autor') {
                Swal.fire({
                    title: 'No es un usuario autor.',
                    allowOutsideClick: false,
                }).then(() => {
                    redirect('/home');
                });
                return;
            }

            setMostrar(true);        
        }

        buscar();
        }, []);


    if (!mostrar) return null;

    return (
        <div>
            <h1>Crear Articulo</h1>
            {message && <p>{message}</p>}
            <div className='formulario'>
                <form onSubmit={handleSubmit}>
                    <input name="title" placeholder="Titulo" value={form.title} onChange={handleChange} required />
                    <textarea name="content" placeholder="Contenido" value={form.content} onChange={handleChange} required />
                    <input name="source" placeholder="Fuente" value={form.source} onChange={handleChange} required />
                    <input name="category" placeholder="Categoria" value={form.category} onChange={handleChange} required />
                    <input name="date" type="date" placeholder="Fecha" value={form.date} onChange={handleChange} required />
                    <input name="imgUrl" placeholder="URL de imagen (opcional)" value={form.imgUrl} onChange={handleChange} />  
                    <div>
                        <button type="submit">Crear</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
