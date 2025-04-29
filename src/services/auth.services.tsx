import axiosInstance from '@/lib/axiosInstance';

const root = 'auth';

export const authService = {
    login: async (username: string, password: string) => {
        try {
            const response = await axiosInstance.post(`/${root}/login`, {
                username,
                password,
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    register: async (name: string, password: string) => {
        try {
            const response = await axiosInstance.post(`/${root}/register`, {
                name,
                password,
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
