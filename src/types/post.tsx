import { I_User } from './user';

export interface I_CreatePost {
    user?: I_User;
    content: string;
    title: string;
    image: string;
}

export interface I_Post extends I_CreatePost {
    id: string;
}
