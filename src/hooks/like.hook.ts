import { likeService } from '@/services/like.services';
import { useQuery } from '@tanstack/react-query';

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
