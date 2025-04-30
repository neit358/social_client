import axiosInstance from '@/lib/axiosInstance';

const root = 'like';

export const likeService = {
    getLike: async (postId: string, userId: string) => {
        try {
            const response = await axiosInstance.get(`/${root}/${postId}/${userId}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    getLikes: async (postId: string) => {
        try {
            const response = await axiosInstance.get(`/${root}/${postId}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    actionLike: async (postId: string, userId: string) => {
        try {
            const response = await axiosInstance.post(`/${root}/action/${postId}`, {
                userId,
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
