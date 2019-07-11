import { Document } from 'mongoose';
import { User } from './user';

export interface Message extends Document {
    _id: string;
    user?: string | User;
    content: string;
    createdAt: Date;
}
