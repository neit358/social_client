'use client';

import { postService } from '@/services/post.services';
import { createContext, useEffect, useState } from 'react';
import Post from '../post/Post';
import { I_Post } from '@/types/post';

export const ManageContext = createContext(null);

export default function Manage({ userId }: { userId: string }) {
    const [posts, setPosts] = useState<I_Post[]>([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await postService.getPostsByUserId(userId);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchApi();
    }, [userId, reload]);

    return (
        <div className="w-full flex items-center justify-center mt-20">
            <div className="w-[500px] flex flex-col gap-4">
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        userId={post.userId}
                        content={post.content}
                        title={post.title}
                        image={post.image}
                        type="edit"
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        </div>
    );
}
