import { Document } from 'mongoose';

export interface User extends Document {
    _id: string;
    userName: string;
    status: boolean;
    email: string;
    password?: string;
    roles: [string];
    createdAt: Date;
}
