import { JSX } from '@emotion/react/jsx-runtime';
import { useState } from 'react';
import { likeService } from '@/services/like.services';

import ListLiked from './ListLiked';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useLike } from '@/hooks/like.hook';
import { useUserLiked } from '@/hooks/post.hook';
import CircularIndeterminate from '../../CircularIndeterminate';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface I_ButtonPost {
    icon: JSX.Element;
    quantity?: number;
    type: string;
    postId: string;
}

export default function ButtonPost({ icon, quantity, type, postId }: I_ButtonPost) {
    const [showListLiked, setShowListLiked] = useState(false);
    const user = useSelector((state: RootState) => state.auth);

    const { data: users = [], isLoading: isLoadingQuantityUserLiked } = useUserLiked(postId);
    const { data: like, isLoading: isLoadingLike } = useLike(postId, user.id);

    const queryClient = useQueryClient();

    const handleClickButtonAction = () => {
        switch (type) {
            case 'like':
                mutate({
                    postId: postId,
                    userId: user.id,
                });
                break;
            case 'comment':
                break;
            case 'share':
                break;
        }
    };

    const handleClickQuantityLike = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setShowListLiked(!showListLiked);
    };

    const useCreateReaction = () => {
        return useMutation({
            mutationFn: async ({ postId, userId }: { postId: string; userId: string }) => {
                console.log('postId', postId);
                const response = await likeService.actionLike(postId, userId);
                queryClient.invalidateQueries({ queryKey: ['likes', postId] });
                return response;
            },
            onMutate: (data) => {
                const { postId, userId } = data;
                queryClient.setQueryData(
                    ['like', postId, userId],
                    (data: { isLiked: boolean }) => ({
                        isLiked: data ? !data.isLiked : true,
                    }),
                );
            },
        });
    };

    const { mutate } = useCreateReaction();

    return (
        <div
            className="w-full flex flex-col items-center justify-center gap-1 rounded-b-2xl cursor-pointer py-4 px-2 hover:bg-gray-100 transition-colors"
            onClick={handleClickButtonAction}
        >
            {isLoadingLike ? (
                <CircularIndeterminate />
            ) : (
                <>
                    <div
                        className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                            type === 'like' && like?.isLiked ? 'text-amber-500' : 'text-gray-500'
                        }`}
                    >
                        {icon}
                        {quantity !== undefined && (
                            <span className="hover:underline" onClick={handleClickQuantityLike}>
                                {quantity}
                            </span>
                        )}
                    </div>

                    {postId && (
                        <ListLiked
                            setShowListLiked={setShowListLiked}
                            showListLiked={showListLiked}
                            isLoading={isLoadingQuantityUserLiked}
                            users={users}
                        />
                    )}
                </>
            )}
        </div>
    );
}
