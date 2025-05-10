import axiosInstance, { handleGetAccessToken } from '@/lib/axiosInstance';
import { I_Auth_Verify } from '@/types/auth.interface';
const root = 'auth';

export const authService = {
    login: async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post(`/${root}/login`, {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    logout: async () => {
        try {
            const token = handleGetAccessToken();
            const response = await axiosInstance.get(`/${root}/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    register: async (email: string, seconds: number) => {
        try {
            const response = await axiosInstance.get(`/${root}/register/${email}/${seconds}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    verify: async ({ email, code, createUserDto }: I_Auth_Verify) => {
        try {
            const response = await axiosInstance.post(`/${root}/register/verify`, {
                email,
                code,
                createUserDto,
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get(`/${root}/check`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
