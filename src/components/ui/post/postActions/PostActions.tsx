'use client';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ReplyIcon from '@mui/icons-material/Reply';

import ButtonPost from './Button';
import { Box } from '@mui/material';
import CircularIndeterminate from '../../CircularIndeterminate';
import { useLikes } from '@/hooks/like.hook';

export default function PostActions({ id: postId }: { id: string }) {
    const { data, isLoading } = useLikes(postId);

    return (
        <Box className="flex justify-around mt-3 border-1 border-gray-300 rounded-b-2xl bg-white">
            {isLoading ? (
                <CircularIndeterminate />
            ) : (
                <>
                    <ButtonPost
                        icon={<ThumbUpIcon />}
                        type={'like'}
                        quantity={data.length}
                        postId={postId}
                    />
                    <ButtonPost icon={<ModeCommentIcon />} type={'comment'} postId={postId} />
                    <ButtonPost icon={<ReplyIcon />} type={'share'} postId={postId} />
                </>
            )}
        </Box>
    );
}
