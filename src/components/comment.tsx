import { IComment } from '@/types/comment';

interface CommentProps {
    comment: IComment;
}

export default function Comment({ comment }: CommentProps) {
    return (
        <div className='comentario'>
            <p>{comment.publisherName} dijo:</p>
            <p>{comment.content}</p>
            <small>{comment.createdAt}</small>
        </div>
    );
}