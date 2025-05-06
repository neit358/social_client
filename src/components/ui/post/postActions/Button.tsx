import { JSX } from '@emotion/react/jsx-runtime';
import { useEffect, useState } from 'react';
import { likeService } from '@/services/like.services';

import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import Toast from '../../toast';
import ListLiked from './ListLiked';

export default function ButtonPost({
    icon,
    quality,
    type,
    postId,
    setAction,
    action,
}: {
    icon: JSX.Element;
    quality?: number;
    type: string;
    postId?: string;
    setAction?: React.Dispatch<React.SetStateAction<boolean>>;
    action?: boolean;
}) {
    const [isLike, setIsLike] = useState(false);
    const [message, setMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [showListLiked, setShowListLiked] = useState(false);
    const user = useSelector((state: RootState) => state.auth);

    const handleClickButtonAction = () => {
        switch (type) {
            case 'like':
                if (!postId || !setAction || !user.id) {
                    setMessage('You must login to like this post!');
                    setOpenToast(true);
                    return;
                }
                const fetchApi = async () => {
                    try {
                        const response = await likeService.actionLike(postId, user.id);
                        if (typeof response.data === 'boolean') setIsLike(false);
                        else setIsLike(true);
                        setAction(!action);
                    } catch (error) {
                        console.error('Error liking the post:', error);
                    }
                };
                fetchApi();
                break;
            case 'comment':
                console.log('Comment button clicked');
                break;
            case 'share':
                console.log('Share button clicked');
                break;
            default:
                console.log('Unknown action');
        }
    };

    useEffect(() => {
        switch (type) {
            case 'like':
                if (!postId || !user.id) return;
                const fetchApi = async () => {
                    try {
                        await likeService.getLike(postId, user.id);
                        setIsLike(true);
                    } catch {
                        setIsLike(false);
                    }
                };
                fetchApi();
                break;
            case 'comment':
                console.log('Comment button clicked');
                break;
            case 'share':
                console.log('Share button clicked');
                break;
            default:
                console.log('Unknown action');
        }
    }, [type, postId, user.id]);

    const handleClickQualityLike = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setShowListLiked(!showListLiked);
    };

    return (
        <div
            className="flex flex-col items-center justify-center w-full hover:bg-gray-200 pt-6 pb-4 transition-colors cursor-pointer rounded-b-2xl"
            onClick={handleClickButtonAction}
        >
            <div
                className="flex items-center gap-1 text-gray-600"
                style={
                    isLike
                        ? {
                              color: '#f59e0b',
                          }
                        : {
                              color: '#4a5565',
                          }
                }
            >
                {icon}
                {quality !== undefined && (
                    <span
                        className="text-sm font-semibold hover:underline"
                        onClick={handleClickQualityLike}
                    >
                        {quality}
                    </span>
                )}
            </div>
            <Toast
                openToast={openToast}
                setOpenToast={setOpenToast}
                message={message}
                horizontal="right"
                vertical="bottom"
            />
            <ListLiked
                postId={postId!}
                setShowListLiked={setShowListLiked}
                showListLiked={showListLiked}
            />
        </div>
    );
}
