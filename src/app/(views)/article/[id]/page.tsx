'use client';

import { useEffect, useState, use } from 'react';
import { IArticle } from '@/types/article';
import { IComment } from '@/types/comment';
import Comment from '@components/comment';
import CommentForm from '@components/commentForm';
import Swal from 'sweetalert2'


import { hasUser, getUser } from "@lib/cookies";
import { IUser } from '@/types/user';
import { redirect } from 'next/navigation';

interface ArticlePageProps {
    id: string;
}

export default function Article({ params }: { params: Promise<ArticlePageProps> }) {
    const { id } = use(params);
    const [article, setArticle] = useState<IArticle | null>(null);
    const [comments, setComments] = useState<IComment[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(true)
    const [userData, setUserData] = useState<IUser>();

    useEffect(() => {
        const fetchData = async () => {
            const resArticle = await fetch(`/api/articles/${id}`);
            const dataArticle = await resArticle.json();
            setArticle(dataArticle.data);

            const resComments = await fetch(`/api/comments?articleId=${id}`);
            const dataComments = await resComments.json();
            setComments(dataComments.data);

            setLoading(false);
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        async function buscar() {
            const has = await hasUser()
            setUser(has)

            if(has){
                const data = await getUser();
                const dataObj: IUser = JSON.parse(data!);
                setUserData(dataObj);
            }
        }
        buscar()
    }, []);



    const handleNewComment = (newComment: IComment) => {
        setComments((oldComments) => [newComment, ...oldComments]);
    };

    if (loading) return <p>Cargando...</p>;
    if (!article) return <div>Artículo no encontrado.</div>;

    if (!user) Swal.fire({ title: 'Inicia sesión para tener acceso a este artículo.', allowOutsideClick: false,}).then((result)=>{if (result.isConfirmed) redirect('/login')});

    if (user) return (
        <div>
            <h1>{article.title}</h1>
            <p>Fuente: {article.source} | Categoría: {article.category}</p>
            <p>{article.content}</p>
            <p>Publicado por: {article.namePublisher}</p>

            <br/>

            <h2>Comentarios</h2>

            { userData?.userType === "lector" ? 
            <CommentForm articleId={id} onNewComment={handleNewComment} userData={userData}/>
            : <></>}
            
            {comments.length > 0 ? (
                comments.map(comment => <Comment key={comment._id} comment={comment} />)
            ) : (
                <p>No hay comentarios.</p>
            )}
        </div>
    );
}