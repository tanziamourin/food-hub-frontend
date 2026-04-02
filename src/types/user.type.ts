export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    emailVerified: boolean;
    phone?: string;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
}
