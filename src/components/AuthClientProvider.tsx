'use client';

import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '@/store/authSlice';
import { authService } from '@/services/auth.services';
import { useEffect } from 'react';
import { handleGetAccessToken } from '@/lib/axiosInstance';

export default function AuthClientProvider() {
    const dispatch = useDispatch();
    const token = handleGetAccessToken();

    const { data, error } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await authService.checkAuth();
            return res.data;
        },
        enabled: !!token,
    });

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        } else if (error) {
            dispatch(clearUser());
        }
    }, [data, error, dispatch]);

    return null;
}
