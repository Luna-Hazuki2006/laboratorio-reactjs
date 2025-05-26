export interface IUser {
    _id?: string; 
    username: string;
    content: string;
    firstName: string;
    lastName: string;
    password: string;
    dateOfBirth: string;
    createdAt?: string;
    updatedAt?: string;
}