import axiosInstance from '@/lib/axiosInstance';
import { I_CreateUser } from '@/types/user';

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

    register: async (email: string) => {
        try {
            const response = await axiosInstance.get(`/${root}/register/${email}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    verify: async (email: string, code: string, createUserDto: I_CreateUser) => {
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
};
