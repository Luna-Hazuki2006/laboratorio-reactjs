'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IArticle } from '@/types/article';

export default function Home() {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [filtered, setFiltered] = useState<IArticle[]>([]);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const router = useRouter();

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

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleFilter = () => {
        const filteredArticles = articles.filter(article =>
            article.category.toLowerCase().includes(filterCategory.toLowerCase())
            && article.date.includes(filterDate)
        );
        setFiltered(filteredArticles);
    };

    //watch los filtros
    useEffect(() => {
        handleFilter();
    }, [filterCategory, filterDate]);

    const handleClickArticle = (id: string) => {
        router.push(`/article/${id}`);
    };

    return (
        <div>
            <h1>Home</h1>
            <input
            className='mb-3'
                type="text"
                placeholder="Filtrar por categoría"
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
                        {
                            (article.imgUrl) ?
                            (<img src={article.imgUrl} alt={article.title} />)
                            :
                            <></>
                        }
                        <h2>{article.title}</h2>
                        <p>{article.category}</p>
                        <button onClick={() => handleClickArticle(article._id)}>Leer artículo</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
