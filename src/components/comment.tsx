import { IComment } from '@/types/comment';

interface CommentProps {
  comment: IComment;
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div>
      <p>{comment.publisherName} dijo:</p>
      <p>{comment.content}</p>
      <p>{comment.createdAt}</p>
    </div>
  );
}