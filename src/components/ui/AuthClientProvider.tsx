'use client';

import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '@/store/authSlice';
import { authService } from '@/services/auth.services';
import { useEffect } from 'react';

export default function AuthClientProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    const { data, error } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await authService.checkAuth();
            return res.data;
        },
    });

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        } else if (error) {
            dispatch(clearUser());
        }
    }, [data, error, dispatch]);

    return <>{children}</>;
}
