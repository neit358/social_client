'use client';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { authService } from '@/services/auth.services';
import { setUser } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { Box, Card, CardContent } from '@mui/material';
import Input from '../../input';

interface FormData {
    name: string;
    password: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
});

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = async (data: FormData): Promise<void> => {
        try {
            const { name, password } = data;
            const response = await authService.register(name, password);
            dispatch(setUser({ ...response }));
            router.push('/login');
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    return (
        <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-y-3">
            <Card sx={{ minWidth: 400 }}>
                <CardContent className="flex flex-col gap-y-3">
                    <h1 className="text-2xl font-bold text-center">Register</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-center justify-center gap-y-5"
                    >
                        <Input
                            placeholder="name"
                            className="mb-3"
                            register={register('name')}
                            errors={errors.name}
                            type="text"
                        />
                        <Input
                            placeholder="password"
                            className="mb-3"
                            register={register('password')}
                            errors={errors.password}
                            type="text"
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
        </Box>
    );
}
