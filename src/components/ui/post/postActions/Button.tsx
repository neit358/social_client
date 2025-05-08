import { JSX } from '@emotion/react/jsx-runtime';
import { useEffect, useState } from 'react';
import { likeService } from '@/services/like.services';

import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import Toast from '../../toast';
import ListLiked from './ListLiked';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CircularIndeterminate from '../../CircularIndeterminate';

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
    const [message, setMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [showListLiked, setShowListLiked] = useState(false);
    const user = useSelector((state: RootState) => state.auth);

    const handleClickButtonAction = () => {
        switch (type) {
            case 'like':
                if (!postId) {
                    setMessage('You must login to like this post!');
                    setOpenToast(true);
                    return;
                }
                mutate({
                    postId: postId,
                    userId: user.id,
                });
                break;
            case 'comment':
                break;
            case 'share':
                break;
            default:
        }
    };

    useEffect(() => {
        switch (type) {
            case 'like':
                break;
            case 'comment':
                break;
            case 'share':
                break;
            default:
        }
    }, [type, postId, user.id]);

    const handleClickQualityLike = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setShowListLiked(!showListLiked);
    };

    const { data: like, isLoading } = useQuery({
        queryKey: ['like', postId, user.id],
        queryFn: async () => {
            if (!postId || !user.id) {
                return {
                    isLiked: false,
                };
            }
            const response = await likeService.getLike(postId, user.id);
            return response.data;
        },
    });

    const useCreateReaction = () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: async ({ postId, userId }: { postId: string; userId: string }) => {
                if (!postId || !userId || !setAction) {
                    setMessage('You must login to like this post!');
                    setOpenToast(true);
                    return;
                }
                const response = await likeService.actionLike(postId, userId);
                setAction(!action);
                return response;
            },
            onMutate: ({ postId, userId }: { postId: string; userId: string }) => {
                if (!postId || !userId) {
                    setMessage('You must login to like this post!');
                    setOpenToast(true);
                    return;
                }
                queryClient.setQueryData(['like', postId, userId], (data: { isLiked: boolean }) => {
                    if (data) {
                        return { ...data, isLiked: !data.isLiked };
                    }
                    return { isLiked: true };
                });
            },
        });
    };

    const { mutate } = useCreateReaction();

    return (
        <div
            className="flex flex-col items-center justify-center w-full hover:bg-gray-200 pt-6 pb-4 transition-colors cursor-pointer rounded-b-2xl"
            onClick={handleClickButtonAction}
        >
            {isLoading ? (
                <CircularIndeterminate />
            ) : (
                <>
                    <div
                        className="flex items-center gap-1 text-gray-600"
                        style={
                            like?.isLiked
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
                </>
            )}
        </div>
    );
}
