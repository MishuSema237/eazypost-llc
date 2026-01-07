/** User & Identity Types */
export interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user' | 'manager';
    permissions: string[];
    createdAt: string;
    updatedAt: string;
}

export interface UserInput {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'manager';
    permissions: string[];
}
