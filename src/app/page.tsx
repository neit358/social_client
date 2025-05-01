'use client';

import { useEffect, useState } from 'react';

import { postService } from '@/services/post.services';
import Toast from '@/components/ui/toast';
import { I_Post } from '@/types/post';
import Header from '@/components/Header';
import Post from '@/components/ui/post/Post';
import { Box } from '@mui/material';
import Register_post from '@/components/ui/register_post/register_post';

export default function Home() {
    const [message, setMessage] = useState('');
    const [turnOn, setTurnOn] = useState(false);
    const [posts, setPosts] = useState<I_Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await postService.getPosts();
                setPosts(response.data);
                setMessage(response.message);
                setTurnOn(true);
                setTimeout(() => {
                    setTurnOn(false);
                    setMessage('');
                }, 3000);
            } catch {
                setMessage('Loi khi lay du lieu!');
                setTurnOn(true);
                setTimeout(() => {
                    setTurnOn(false);
                    setMessage('');
                }, 3000);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Box>
            <Header />
            <div className="w-full flex items-center justify-center mt-20">
                <div className="w-[500px] flex flex-col gap-4">
                    <Register_post />
                    {posts.map((post) => (
                        <Post
                            key={post.id}
                            id={post.id}
                            userId={post.userId}
                            content={post.content}
                            title={post.title}
                            image={post.image}
                            type="post"
                        />
                    ))}
                </div>
                {turnOn && <Toast message={message} turnOn={turnOn} />}
            </div>
        </Box>
    );
}
