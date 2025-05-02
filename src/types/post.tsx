export interface I_Post {
    id: string;
    content: string;
    title: string;
    image: string;
}

export interface I_CreatePost extends I_Post {
    userId: string;
}
