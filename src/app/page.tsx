'use client';

import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';

import { postService } from '@/services/post.services';
import Toast from '@/components/ui/toast';
import { I_Post } from '@/types/post';
import Header from '@/components/Header';
import Post from '@/components/ui/post/Post';
import Register_post from '@/components/ui/register_post/Register_post';
import Sidebar from '@/components/Sidbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Home() {
    const [message, setMessage] = useState('');
    const [turnOn, setTurnOn] = useState(false);
    const [posts, setPosts] = useState<I_Post[]>([]);
    const userId = useSelector((state: RootState) => state.sidebar.userId);
    const search = useSelector((state: RootState) => state.header.search);

    useEffect(() => {
        handleGetPosts();
    }, []);

    useEffect(() => {
        handleGetPosts(userId);
    }, [userId]);

    useEffect(() => {
        handleGetPosts(undefined, search);
    }, [search]);

    const handleGetPosts = async (userId?: string, search?: string) => {
        try {
            console.log(userId, search);
            const response =
                userId && userId !== ''
                    ? await postService.getPostsByUserId(userId)
                    : search
                    ? await postService.getPostsSearch(search)
                    : await postService.getPosts();
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

    return (
        <Box>
            <Header />
            <div className="w-full flex items-center justify-center mt-20">
                <Grid className="w-[1200px]" container spacing={2}>
                    <Grid size={4} className="">
                        <Sidebar setMessage={setMessage} setTurnOn={setTurnOn} />
                    </Grid>
                    <Grid size={8} className="flex flex-col gap-4">
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
                    </Grid>
                </Grid>
                {turnOn && <Toast message={message} turnOn={turnOn} />}
            </div>
        </Box>
    );
}
