import { useMutation, useQuery } from '@tanstack/react-query';

import { authService } from '@/services/auth.services';
import { I_Auth_Verify } from '@/types/auth.interface';
import { I_BaseResponseSuccess } from '@/types/response.interface';
import { I_User } from '@/types/user.interface';

export const useVerify = () => {
    return useMutation({
        mutationKey: ['verify'],
        mutationFn: async ({
            email,
            code,
            createUserDto,
        }: I_Auth_Verify): Promise<I_BaseResponseSuccess<I_User>> => {
            const response = await authService.verify({ email, code, createUserDto });
            return response;
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationKey: ['register'],
        mutationFn: async ({ email, ttl }: { email: string; ttl: number }) => {
            const response = await authService.register(email, ttl);
            return response;
        },
    });
};

export const useLogout = () => {
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            const response = await authService.logout();
            return response;
        },
    });
};

export const useLogin = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const response = await authService.login(email, password);
            return response;
        },
    });
};

export const useCheckAuth = (userId: string) => {
    return useQuery({
        queryKey: ['checkAuth'],
        queryFn: async () => {
            const res = await authService.checkAuth();
            return res.data;
        },
        enabled: !!userId,
    });
};
