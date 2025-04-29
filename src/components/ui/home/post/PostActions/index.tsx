'use client';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ReplyIcon from '@mui/icons-material/Reply';
import Button from './Button';
import { useEffect, useState } from 'react';

import { likeService } from '@/services/like.services';

export default function PostActions({ postId }: { postId: string }) {
    const [likes, setLikes] = useState([]);
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await likeService.getLikes(postId);
                setLikes(response.data);
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };

        fetchLikes();
    }, []);

    return (
        <div className="flex justify-between border-t-1 rounded-bl-2xl rounded-br-2xl px-5 py-2">
            <Button icon={<ThumbUpIcon />} quality={likes.length} />
            <Button icon={<ModeCommentIcon />} />
            <Button icon={<ReplyIcon />} />
        </div>
    );
}
