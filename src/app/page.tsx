'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IComment } from '@/types/comment';
import { hasUser } from "@lib/cookies";

// ------------------- Solo de ejemplo, luego dejar page vacío

export default function CommentsPage() {
    const [comments, setComments] = useState<IComment[]>([]);
    const [content, setContent] = useState('');
    const [publisherId, setPublisherId] = useState('');
    const [articleId, setArticleId] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(true)
    

    const fetchComments = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/comments');
            const json = await res.json();
            setComments(json.data || []);
        } catch (err) {
            console.error('Error fetching comments', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!content || !publisherId || !articleId) return;

        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, publisherId, articleId }),
            });

            if (res.ok) {
                setContent('');
                setPublisherId('');
                setArticleId('');
                fetchComments();
            } else {
                console.error('Error creating comment');
            }
        } catch (err) {
            console.error('POST error', err);
        }
    };

    useEffect(() => {
        async function buscar() {
            const data = await hasUser()
            setUser(data)
        }
        buscar()
        // redirect('/home'); // Comentar para ver el funcionamiento de lo otro
        fetchComments();
    }, []);
    
    if (!user) redirect('/login') 
    else return (
        <main style={{ padding: '2rem' }}>
            <h1>Comments</h1>
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    style={{ padding: '0.5rem', marginBottom: '0.5rem', display: 'block' }}
                />
                <input
                    type="text"
                    value={publisherId}
                    onChange={(e) => setPublisherId(e.target.value)}
                    placeholder="Publisher ID"
                    style={{ padding: '0.5rem', marginBottom: '0.5rem', display: 'block' }}
                />
                <input
                    type="text"
                    value={articleId}
                    onChange={(e) => setArticleId(e.target.value)}
                    placeholder="Article ID"
                    style={{ padding: '0.5rem', marginBottom: '0.5rem', display: 'block' }}
                />
                <button onClick={handleSubmit} style={{ padding: '0.5rem' }}>
                    Add Comment
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                <ul>
                    {comments.map((comment, index) => (
                        <li key={comment._id || index}>
                                Publisher Id: {comment.publisherId}, Article Id: {comment.articleId}    Content:{comment.content}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
