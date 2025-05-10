import { useMutation } from '@tanstack/react-query';

import { authService } from '@/services/auth.services';
import { I_Auth_Verify } from '@/types/auth.interface';

export const useVerify = () => {
    return useMutation({
        mutationKey: ['verify'],
        mutationFn: async ({ email, code, createUserDto }: I_Auth_Verify) => {
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
