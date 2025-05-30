'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IArticle } from '@/types/article';
import Image from 'next/image';

export default function Home() {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [filtered, setFiltered] = useState<IArticle[]>([]);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('/api/articles');
                const data = await res.json();
                setArticles(data.data);
                setFiltered(data.data);
            } catch (error) {
                console.error('Error al obtener artículos:', error);
            }
        };
        fetchArticles();
    }, []);

    //watch los filtros
    useEffect(() => {
        const handleFilter = () => {
            const filteredArticles = articles.filter(article =>
                article.category.toLowerCase().includes(filterCategory.toLowerCase())
                && article.date.includes(filterDate)
            );
            setFiltered(filteredArticles);
        };
        handleFilter();
    }, [filterCategory, filterDate]);

    const handleClickArticle = (id: string) => {
        router.push(`/article/${id}`);
    };

    return (
        <div>
            <h1>Artículos más recientes de Noticias<sup>TM</sup></h1>
            <input
            className='mb-3'
                type="text"
                placeholder="Filtrar por categoría. Ejemplo: zoología"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
            />

            <input
            className='mb-3'
                type="date"
                placeholder="Filtrar por fecha"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
            />

            <ul>
                {filtered.map(article => (
                    <li key={article._id}>
                        <div className='articulos'>
                            {
                                (article.imgUrl) ?
                                (
                                    <div>
                                        <img src={article.imgUrl} alt={article.title} />
                                    </div>
                                )
                                :
                                <></>
                            }
                            <h2><b>{article.title}</b></h2>
                            <p>{
                                (article.content.length > 50) ? 
                                article.content.substring(0, 50) 
                                : 
                                article.content
                            }</p>
                            <p>Categorías: {article.category}</p>
                            <p>Fecha de la noticia: {article.date}</p>
                            <button onClick={() => handleClickArticle(article._id)}>Leer artículo</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
