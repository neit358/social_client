'use client';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Box, Button, Card, CardContent, Modal, Typography } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useState } from 'react';

import Input from '../../input';
import Toast from '../../toast';
import { I_CreateUser } from '@/types/user.interface';
import { useRegister, useVerify } from '@/hooks/auth.hook';
import LoadingPage from '../../loadingPage';

const schema = Yup.object().shape({
    email: Yup.string().trim().email('Email is invalid').required('Email is required'),
    name: Yup.string().trim().required('Name is required'),
    password: Yup.string()
        .trim()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        ),
});

export default function Register() {
    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [openToast, setOpenToast] = useState<boolean>(false);
    const { mutate: verify, isError: errorVerify, isPending: pendingVerify } = useVerify();
    const { mutate: registerUser, isPending: pendingRegisterUser } = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<I_CreateUser>({
        resolver: yupResolver(schema),
    });
    const router = useRouter();

    const onSubmit = async (data: I_CreateUser): Promise<void> => {
        const { email } = data;
        registerUser(
            { email, ttl: 60 },
            {
                onSuccess: (response) => {
                    setMessage(response.message);
                    setOpenToast(true);
                    setOpen(true);
                },
                onError: () => {
                    setMessage('Register failed!');
                    setOpenToast(true);
                },
            },
        );
    };

    const onVerify = async (data: I_CreateUser): Promise<void> => {
        const { email } = data;
        verify(
            { email, code: otp, createUserDto: data },
            {
                onSuccess: (response) => {
                    setMessage(response.message);
                    setOpenToast(true);
                    router.push('/login');
                },
                onError: () => {
                    setMessage('Verify failed!');
                    setOpenToast(true);
                },
            },
        );
    };

    return (
        <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-y-3">
            <Card sx={{ minWidth: 400, borderRadius: 3 }}>
                <CardContent className="flex flex-col gap-y-3">
                    <h1 className="text-2xl font-bold text-center">Register</h1>
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
                            placeholder="name"
                            register={register('name')}
                            errors={errors.name}
                            type="text"
                        />
                        <Input
                            placeholder="password"
                            register={register('password')}
                            errors={errors.password}
                            type="password"
                        />
                        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                            Register
                        </button>
                        <p className="text-center">
                            You have an account?{' '}
                            <a href="/login" className="text-blue-500">
                                Login
                            </a>
                        </p>
                    </form>
                </CardContent>
            </Card>

            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setOtp('');
                }}
                className="flex items-center justify-center h-screen"
            >
                <Card sx={{ maxWidth: 500, borderRadius: 3 }} className="flex flex-col gap-y-3">
                    <CardContent className="flex flex-col gap-y-3">
                        <h1 className="text-2xl font-bold text-center">Verify OTP</h1>
                        <p className="text-center">Enter the OTP sent to your email</p>
                        <MuiOtpInput
                            length={6}
                            value={otp}
                            onChange={(value: string) => {
                                setOtp(value);
                            }}
                            validateChar={(value: string) => {
                                return /^[0-9]$/.test(value);
                            }}
                            TextFieldsProps={{
                                error: !!errorVerify,
                            }}
                        />
                        {errorVerify && (
                            <Typography
                                color="error"
                                variant="body2"
                                sx={{ mt: 1, textAlign: 'center' }}
                            >
                                {message}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit(onVerify)}
                        >
                            Verify
                        </Button>
                    </CardContent>
                </Card>
            </Modal>
            <Toast
                message={message}
                openToast={openToast}
                setOpenToast={setOpenToast}
                horizontal="right"
                vertical="bottom"
            />
            {(pendingRegisterUser || pendingVerify) && <LoadingPage />}
        </Box>
    );
}
