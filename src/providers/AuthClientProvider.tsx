'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearUser, setUser } from '@/store/authSlice';
import { useCheckAuth } from '@/hooks/auth.hook';
import { RootState } from '@/store';

export default function AuthClientProvider() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth);

    const { data, error } = useCheckAuth(user.id);

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        } else if (error) {
            dispatch(clearUser());
        }
    }, [data, error, dispatch]);

    return null;
}
