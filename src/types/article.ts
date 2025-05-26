export interface IArticle {
    _id?: string; 
    title: string;
    content: string;
    source: string;
    category: string;
    date: string;
    namePublisher: string;
    idPublisher: string;
    imgUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}