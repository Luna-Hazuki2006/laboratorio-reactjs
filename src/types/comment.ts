export interface IComment {
  _id?: string; 
  content: string;
  publisherId: string;
  articleId: string;
  createdAt?: string;
  updatedAt?: string;
}