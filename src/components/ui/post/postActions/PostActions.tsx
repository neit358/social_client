'use client';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ReplyIcon from '@mui/icons-material/Reply';
import { useState } from 'react';

import { likeService } from '@/services/like.services';
import { I_Post } from '@/types/post';
import ButtonPost from './Button';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/material';
import CircularIndeterminate from '../../CircularIndeterminate';

export default function PostActions({ id: postId }: Partial<I_Post>) {
    const [action, setAction] = useState(false);
    const { data, isLoading, error } = useQuery({
        queryKey: ['likes', postId, action],
        queryFn: async () => {
            if (!postId) return;
            const response = await likeService.getLikes(postId);
            return response.data;
        },
    });

    if (error) {
    }

    return (
        <Box className="flex justify-around mt-3 border-1 border-gray-300 rounded-b-2xl bg-white">
            {isLoading ? (
                <CircularIndeterminate />
            ) : (
                <>
                    <ButtonPost
                        icon={<ThumbUpIcon />}
                        quality={data.length}
                        type={'like'}
                        postId={postId}
                        setAction={setAction}
                        action={action}
                    />
                    <ButtonPost icon={<ModeCommentIcon />} type={'comment'} />
                    <ButtonPost icon={<ReplyIcon />} type={'share'} />
                </>
            )}
        </Box>
    );
}
