import { I_User } from './user.interface';

export interface I_Post {
    id: string;
    content: string;
    title: string;
    image: string;
    user: I_User;
    userId: string;
}
