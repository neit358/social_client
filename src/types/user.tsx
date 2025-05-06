export interface I_BaseUser {
    name: string;
    password: string;
}

export interface I_CreateUser extends I_BaseUser {
    email: string;
}

export interface I_UpdateUser extends I_BaseUser {
    avatar: string;
}

export interface I_User extends I_CreateUser, I_UpdateUser {
    id: string;
}
