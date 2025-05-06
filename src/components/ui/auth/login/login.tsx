'use client';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardContent } from '@mui/material';
import { useState } from 'react';

import Input from '../../input';
import { setUser } from '@/store/authSlice';
import { authService } from '@/services/auth.services';
import Toast from '../../toast';
import Loading from '../../loading';

interface FormData {
    email: string;
    password: string;
}

const schema = Yup.object().shape({
    email: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

export default function Login() {
    const [message, setMessage] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData): Promise<void> => {
        try {
            const { email, password } = data;
            setIsLoading(true);
            const response = await authService.login(email, password);
            dispatch(setUser({ ...response.data }));
            setMessage('Login successfully!');
            setOpenToast(true);
            setIsLoading(false);
            router.push('/');
        } catch {
            setMessage('Login error!');
            setOpenToast(true);
        }
    };
    return (
        <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Card sx={{ minWidth: 400, borderRadius: 3 }}>
                <CardContent className="flex flex-col gap-y-3">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <p className="text-center">Login to your account</p>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-center justify-center gap-y-5"
                    >
                        <Input
                            placeholder="email"
                            register={register('email')}
                            errors={errors.email}
                            type="text"
                        />
                        <Input
                            placeholder="password"
                            register={register('password')}
                            errors={errors.password}
                            type="password"
                        />

                        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                            Login
                        </button>
                        <p className="text-center">
                            Don&apos;t have an account?{' '}
                            <a href="/register" className="text-blue-500">
                                Register
                            </a>
                        </p>
                    </form>
                </CardContent>
            </Card>
            <Toast
                openToast={openToast}
                setOpenToast={setOpenToast}
                message={message}
                horizontal="right"
                vertical="bottom"
            />

            {isLoading && <Loading></Loading>}
        </Box>
    );
}
