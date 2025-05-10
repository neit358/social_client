import { postService } from '@/services/post.services';
import { I_User } from '@/types/user.interface';
import { useQuery } from '@tanstack/react-query';

export const useUserLiked = (postId: string) => {
    return useQuery<I_User[]>({
        queryKey: ['usersLiked'],
        queryFn: async () => {
            if (!postId) return;
            const response = await postService.getUserLikedByPostId(postId);
            if (response.statusCode === 200) {
                return response.data.likes.map((like: { user: I_User }) => like.user);
            }
        },
    });
};

export const usePosts = (userId: string) => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            if (!userId) return;
            const response = await postService.getPostsByUserId(userId);
            return response.data;
        },
    });
};
