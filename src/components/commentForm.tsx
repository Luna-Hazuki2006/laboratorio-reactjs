'use client';

import { useState } from 'react';
import { IComment } from '@/types/comment';
import { IUser } from '@/types/user';

interface CommentFormProps {
    articleId: string;
    onNewComment: (comment: IComment) => void; // func en ts 
    userData: IUser;
}

export default function CommentForm( {articleId, onNewComment, userData} : CommentFormProps) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, publisherId: userData._id, publisherName:userData.firstName, articleId }),
            });

            if (!res.ok) throw new Error('Error al enviar comentario');
            
            const data = await res.json();
            onNewComment(data.data); // comentario en cuestión
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
