export interface IUser {
    _id?: string; 
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    dateOfBirth: string;
    userType: string;
    createdAt?: string;
    updatedAt?: string;
}