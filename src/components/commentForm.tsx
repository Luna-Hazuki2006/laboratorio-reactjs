'use client';

import { useState } from 'react';

interface CommentFormProps {
  articleId: string;
}

export default function CommentForm( {articleId} : CommentFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, publisherId:'informacion del token que espero esté pronto paula', publisherName:'informacion del token que espero esté pronto paula', articleId }),
      });

      if (!res.ok) throw new Error('Error al enviar comentario');
      setContent('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitComment}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Déjanos tu comentario..."
        required
      />
      <button type="submit" disabled={loading}>Enviar</button>
    </form>
  );
}
