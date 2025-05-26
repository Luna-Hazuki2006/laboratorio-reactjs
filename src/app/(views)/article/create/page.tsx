'use client';

import { useState } from 'react';

export default function CreateArticlePage() {
    const [message, setMessage] = useState('');
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
                body: JSON.stringify(form)
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
                    <input name="namePublisher" placeholder="nombre autor (por motivos de prueba asi pero esto va del token cuando haya autenticacion (hola paula)" value={form.namePublisher} onChange={handleChange} required />
                    <input name="idPublisher" placeholder="id autor (por motivos de prueba asi pero esto va del token cuando haya autenticacion (hola paula)" value={form.idPublisher} onChange={handleChange} required />
                    <button type="submit">Crear</button>
                </form>
            </div>
        </div>
    );
}
