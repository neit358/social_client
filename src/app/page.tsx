'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { postService } from '@/services/post.services';
import Toast from '@/components/ui/toast';
import { I_CreatePost } from '@/types/post';
import Header from '@/components/Header';
import Post from '@/components/ui/post/Post';
import Register_post from '@/components/ui/register_post/Register_post';
import Sidebar from '@/components/Sidbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Home() {
    const [reloading, setReLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [posts, setPosts] = useState<I_CreatePost[]>([]);
    const userId = useSelector((state: RootState) => state.sidebar.userId);
    const search = useSelector((state: RootState) => state.header.search);

    useEffect(() => {
        handleGetPosts();
    }, [reloading]);

    useEffect(() => {
        handleGetPosts(userId);
    }, [userId]);

    useEffect(() => {
        handleGetPosts(undefined, search);
    }, [search]);

    const handleGetPosts = async (userId?: string, search?: string) => {
        try {
            const response =
                userId && userId !== ''
                    ? await postService.getPostsByUserId(userId)
                    : search
                    ? await postService.getPostsSearch(search)
                    : await postService.getPosts();
            setPosts(response.data);
            setMessage(response.message);
            setOpenToast(true);
        } catch {
            setMessage('Loi khi lay du lieu!');
            setOpenToast(true);
        }
    };

    return (
        <Box>
            <Header />
            <div className="w-full flex items-center justify-center mt-19">
                <div className="w-[1200px] grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                        <Sidebar setMessage={setMessage} setOpenToast={setOpenToast} />
                    </div>
                    <div className="col-span-8 flex flex-col gap-4">
                        <Register_post setReLoading={setReLoading} reloading={reloading} />
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
                </div>
                <Toast
                    openToast={openToast}
                    setOpenToast={setOpenToast}
                    message={message}
                    horizontal="right"
                    vertical="bottom"
                />
            </div>
        </Box>
    );
}
