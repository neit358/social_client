import { formDataChangePasswordSchema } from '@/components/ui/profile/modal_change_password/Model_change_password';
import axiosInstance from '@/lib/axiosInstance';

const root = 'user';

export const userService = {
    getUser: async (userId: string) => {
        try {
            const response = await axiosInstance.get(`/${root}/${userId}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    getUsers: async () => {
        try {
            const response = await axiosInstance.get(`/${root}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    updateUser: async (id: string, body: { name: string }, formData: FormData) => {
        try {
            Object.entries(body).forEach(([key, value]) => {
                formData.append(key, value.toString());
            });
            const response = await axiosInstance.patch(`/${root}/update/${id}`, formData, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                },
            });
            return response.data;
        } catch (error) {
            Promise.reject(error);
        }
    },

    updatePassword: async (id: string, body: formDataChangePasswordSchema) => {
        try {
            const response = await axiosInstance.patch(`/${root}/update-password/${id}`, body);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
