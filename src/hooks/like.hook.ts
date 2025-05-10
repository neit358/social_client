import { likeService } from '@/services/like.services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useLike = (postId: string, userId: string) => {
    return useQuery({
        queryKey: ['like', postId, userId],
        queryFn: async () => {
            const response = await likeService.getLike(postId, userId);
            return response.data;
        },
    });
};

export const useLikes = (postId: string) => {
    return useQuery({
        queryKey: ['likes', postId],
        queryFn: async () => {
            const response = await likeService.getLikes(postId);
            return response.data;
        },
    });
};

export const useCreateReaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, userId }: { postId: string; userId: string }) => {
            const response = await likeService.actionLike(postId, userId);
            queryClient.invalidateQueries({ queryKey: ['likes', postId] });
            return response;
        },
        onMutate: (data) => {
            const { postId, userId } = data;
            queryClient.setQueryData(['like', postId, userId], (data: { isLiked: boolean }) => ({
                isLiked: data ? !data.isLiked : true,
            }));
        },
    });
};
