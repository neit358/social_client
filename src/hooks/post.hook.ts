import { postService } from '@/services/post.services';
import { I_User } from '@/types/user.interface';
import { useMutation, useQuery } from '@tanstack/react-query';

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
        queryKey: ['postsByUserId', userId],
        queryFn: async () => {
            if (!userId) return;
            const response = await postService.getPostsByUserId(userId);
            return response.data;
        },
    });
};

export const useSearchPosts = (search: string) => {
    return useQuery({
        queryKey: ['postsByElastic', search],
        queryFn: async () => {
            if (!search) return;
            const response = await postService.getPostsSearchElastic(search);
            return response.data;
        },
    });
};

export const useCreatePost = () => {
    return useMutation({
        mutationKey: ['createPost'],
        mutationFn: async ({
            title,
            content,
            userId,
            image,
        }: {
            title: string;
            content: string;
            userId: string;
            image: File;
        }) => {
            const response = await postService.createPost(title, content, userId, image);
            return response;
        },
    });
};

export const useUpdatePost = () => {
    return useMutation({
        mutationKey: ['updatePost'],
        mutationFn: async ({
            postId,
            title,
            content,
            image,
        }: {
            postId: string;
            title: string;
            content: string;
            image: File;
        }) => {
            const response = await postService.updatePost(postId, title, content, image);
            return response;
        },
    });
};

export const useRemovePost = () => {
    return useMutation({
        mutationKey: ['removePost'],
        mutationFn: async (postId: string) => {
            const response = await postService.deletePost(postId);
            return response;
        },
    });
};
