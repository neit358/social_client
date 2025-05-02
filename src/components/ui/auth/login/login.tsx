'use client';
import { authService } from '@/services/auth.services';
import { setUser } from '@/store/authSlice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Card, CardContent } from '@mui/material';
import Input from '../../input';

interface FormData {
    name: string;
    password: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

export default function Login() {
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
            const response = await authService.login(name, password);
            dispatch(setUser({ ...response }));
            router.push('/home');
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Card sx={{ minWidth: 400 }}>
                <CardContent className="flex flex-col gap-y-3">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <p className="text-center">Login to your account</p>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-center justify-center gap-y-5"
                    >
                        <Input
                            placeholder="name"
                            className=""
                            register={register('name')}
                            errors={errors.name}
                            type="text"
                        />
                        <Input
                            placeholder="password"
                            className=""
                            register={register('password')}
                            errors={errors.password}
                            type="text"
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
        </div>
    );
}
