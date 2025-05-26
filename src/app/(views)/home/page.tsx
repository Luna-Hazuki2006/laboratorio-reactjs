'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IArticle } from '@/types/article';

export default function Home() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [filtered, setFiltered] = useState<IArticle[]>([]);
  const [filter, setFilter] = useState('');
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

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filteredArticles = articles.filter(article =>
      article.category.toLowerCase().includes(value)
    );
    setFiltered(filteredArticles);
  };

  const handleClickArticle = (id: string) => {
    router.push(`/article/${id}`);
  };

  return (
    <div>
      <h1>Home</h1>

      <input
        type="text"
        placeholder="Filtrar por categoría"
        value={filter}
        onChange={handleFilter}
      />

      <ul>
        {filtered.map(article => (
          <li key={article._id}>
            <h2>{article.title}</h2>
            <p>{article.category}</p>
            <button onClick={() => handleClickArticle(article._id)}>Leer artículo</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
