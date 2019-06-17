export class UserDto {
    readonly _id?: string;
    readonly userName: string;
    readonly email: string;
    readonly status: boolean;
    readonly password: string;
    readonly roles: [string];
}

export class LoginUserDto {
    readonly email: string;
    readonly password: string;
}
