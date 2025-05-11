'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { clearUser, setUser } from '@/store/authSlice';
import { useCheckAuth } from '@/hooks/auth.hook';

export default function AuthClientProvider() {
    const dispatch = useDispatch();

    const { data, error } = useCheckAuth();

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        } else if (error) {
            dispatch(clearUser());
        }
    }, [data, error, dispatch]);

    return null;
}
