'use client';

import { useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { SentimentSatisfied } from '@mui/icons-material';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

import ButtonPost from './Button';
import { Box } from '@mui/material';
import { useLikes } from '@/hooks/like.hook';
import ListLiked from './ListLiked';

export default function PostActions({ id: postId }: { id: string }) {
    const { data, isLoading } = useLikes(postId);
    const [showListLiked, setShowListLiked] = useState(false);

    const handleClickListLiked = () => {
        setShowListLiked(true);
    };

    return (
        <Box>
            <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-400">
                <div className="flex items-center gap-1 group" onClick={handleClickListLiked}>
                    <span className="flex -space-x-1">
                        <SentimentSatisfied className="text-yellow-400 w-5 h-5" />
                    </span>
                    <span className="ml-1 group-hover:underline">{data?.length}</span>
                </div>

                <div className="flex items-center gap-4">
                    <span>143 bình luận</span>
                    <span>30 lượt chia sẻ</span>
                </div>
            </div>
            <div className="flex justify-around border-1 border-y-gray-300 border-x-transparent bg-white">
                <ButtonPost icon={<ThumbUpIcon />} type={'like'} postId={postId} />
                <ButtonPost icon={<ModeCommentIcon />} type={'comment'} postId={postId} />
                <ButtonPost icon={<ReplyIcon />} type={'share'} postId={postId} />
            </div>
            {showListLiked && (
                <ListLiked
                    users={data}
                    isLoading={isLoading}
                    setShowListLiked={setShowListLiked}
                    showListLiked={showListLiked}
                />
            )}
        </Box>
    );
}
