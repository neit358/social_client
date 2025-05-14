'use client';

import { useState } from 'react';
import { Box } from '@mui/material';

import { RootState } from '@/store';
import Header from '@/components/Header';
import Toast from '@/components/ui/toast';
import { useSelector } from 'react-redux';
import Post from '@/components/ui/post/Post';
import { I_Post } from '@/types/post.interface';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '@/components/ui/loadingPage';
import { postService } from '@/services/post.services';
import Register_post from '@/components/ui/register_post/Register_post';
import Sidebar from '@/components/Sidebar';

export default function Home() {
    const [message, setMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const userId = useSelector((state: RootState) => state.sidebar.userId);
    const search = useSelector((state: RootState) => state.header.search);
    const { data, isLoading, error } = useQuery({
        queryKey: ['postsList'],
        queryFn: async () => {
            const response =
                userId && userId !== ''
                    ? await postService.getPostsByUserId(userId)
                    : await postService.getPostsSearchElastic(search);
            setMessage('Posts fetched successfully');
            setOpenToast(true);
            return response.data;
        },
    });

    if (error) {
        setMessage('Error fetching posts');
        setOpenToast(true);
    }

    return (
        <Box>
            <Header />
            <div className="w-full flex items-center justify-center mt-19">
                <div className="w-[1200px] grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                        <Sidebar setMessage={setMessage} setOpenToast={setOpenToast} />
                    </div>
                    <div className="col-span-8 flex flex-col gap-4">
                        <Register_post />
                        {data?.map((post: I_Post) => (
                            <Post
                                key={post.id}
                                id={post.id}
                                user={post.user}
                                content={post.content}
                                title={post.title}
                                image={post.image}
                                userId={post.userId}
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
            {isLoading && <LoadingPage />}
        </Box>
    );
}
