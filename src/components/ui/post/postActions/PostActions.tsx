'use client';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ReplyIcon from '@mui/icons-material/Reply';
import { useEffect, useState } from 'react';

import { likeService } from '@/services/like.services';
import { I_Post } from '@/types/post';
import ButtonPost from './Button';

export default function PostActions({ id: postId }: Partial<I_Post>) {
    const [likes, setLikes] = useState([]);
    const [action, setAction] = useState(false);
    useEffect(() => {
        const fetchLikes = async () => {
            if (!postId) return;
            try {
                const response = await likeService.getLikes(postId);
                setLikes(response.data);
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };

        fetchLikes();
    }, [postId, action]);

    return (
        <div className="flex justify-around mt-3 pt-4 pb-2 border-t border-gray-300 rounded-b-2xl bg-white">
            <ButtonPost
                icon={<ThumbUpIcon />}
                quality={likes.length}
                type={'like'}
                postId={postId}
                setAction={setAction}
                action={action}
            />
            <ButtonPost icon={<ModeCommentIcon />} type={'comment'} />
            <ButtonPost icon={<ReplyIcon />} type={'share'} />
        </div>
    );
}
