import axiosInstance from '@/lib/axiosInstance';

export const likeService = {
    getLikes: async (postId: string) => {
        try {
            const response = await axiosInstance.get(`/like/${postId}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
