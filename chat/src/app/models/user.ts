export interface User {
    _id?: string;
    userName?: string;
    email: string;
    status?: boolean;
    password?: string;
    roles?: [string];
}
