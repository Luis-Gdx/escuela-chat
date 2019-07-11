import { User } from './user';

export interface Message {
    _id?: string;
    user?: string | User;
    content?: string;
    createdAt?: Date;
}
