import axiosInstance from '@/lib/axiosInstance';

const root = 'post';

export const postService = {
    getPostById: async (postId: string) => {
        try {
            const response = await axiosInstance.get(`/${root}/${postId}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    getPostsByUserId: async (userId: string) => {
        try {
            const response = await axiosInstance.get(`/${root}/user/${userId}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    getPosts: async () => {
        try {
            const response = await axiosInstance.get(`/${root}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    createPost: async (title: string, content: string, userId: string, image: File) => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('userId', userId);
            formData.append('image', image);

            const response = await axiosInstance.post(`/${root}/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    deletePost: async (postId: string) => {
        try {
            const response = await axiosInstance.delete(`/${root}/delete/${postId}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    updatePost: async (postId: string, title: string, content: string, image: File) => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('image', image);

            const response = await axiosInstance.patch(`/${root}/update/${postId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
