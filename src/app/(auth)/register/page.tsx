'use client';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { authService } from '@/services/auth.services';
import { setUser } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@mui/material';

interface FormData {
    name: string;
    password: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
});

export default function RegisterPage() {
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-y-3">
            <Card sx={{ minWidth: 300 }}>
                <CardContent className="flex flex-col gap-y-3">
                    <h1 className="text-2xl font-bold text-center">Register</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-center justify-center gap-y-3"
                    >
                        <div>
                            <input
                                {...register('name')}
                                placeholder="Username"
                                className="mb-1 p-2 border rounded"
                            />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div>
                            <input
                                {...register('password')}
                                type="password"
                                placeholder="Password"
                                className="mb-1 p-2 border rounded"
                            />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
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
        </div>
    );
}
