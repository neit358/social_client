'use client';

import * as Yup from 'yup';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import React, { useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent } from '@mui/material';

import { RootState } from '@/store';
import { userService } from '@/services/user.services';
import Header from '@/components/Header';
import Input from '@/components/ui/input';
import Toast from '@/components/ui/toast';
import { setUser } from '@/store/authSlice';

interface FormDataUser {
    name: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
});

export default function User() {
    const [isEdit, setIsEdit] = useState(false);
    const [message, setMessage] = useState('');
    const [turnOn, setTurnOn] = useState(false);
    const user = useSelector((state: RootState) => state.auth);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(user.avatar);
    const [file, setFile] = useState<File | null>(null);
    const refButton = useRef<HTMLButtonElement | null>(null);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataUser>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: user.name,
        },
    });

    const hanldeClickChangeAvatar = () => {
        if (isEdit) {
            inputFileRef.current?.click();
        }
    };

    const onSubmit = async (data: FormDataUser): Promise<void> => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            if (file) formData.append('image', file);
            const response = await userService.updateUser(user.id, { name: data.name }, formData);
            setIsEdit(!isEdit);
            setMessage(response.message);
            setTurnOn(true);
            setIsLoading(false);
            setTimeout(() => {
                setMessage('');
                setTurnOn(false);
            }, 3000);
            dispatch(setUser(response.data));
        } catch {
            setMessage('Error updating user');
            setTurnOn(true);
            setTimeout(() => {
                setMessage('');
                setTurnOn(false);
            }, 3000);
        }
    };

    function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFile(file);
        }
    }
    return (
        <Box>
            <Header />
            <Box className="flex flex-col items-center justify-center h-screen">
                <Card sx={{ minWidth: 400 }} variant="outlined">
                    <CardContent>
                        <form
                            className="flex flex-col items-center justify-center h-full gap-y-6 bg"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <h1 className="text-2xl font-bold">Profile</h1>
                            <div
                                className="flex flex-col items-center relative group"
                                onClick={hanldeClickChangeAvatar}
                            >
                                <Image
                                    src={preview}
                                    alt="User avatar"
                                    width={100}
                                    height={100}
                                    priority
                                    className="w-20 h-20 rounded-full overflow-hidden"
                                />
                                {isEdit && (
                                    <EditIcon
                                        className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                                        color="warning"
                                    />
                                )}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/jpeg, image/png, image/webp"
                                    ref={inputFileRef}
                                    onChange={handleChangeImage}
                                />
                            </div>
                            <Input
                                register={register('name')}
                                type="text"
                                placeholder="name"
                                errors={errors.name}
                                disabled={!isEdit}
                            />
                            <Button
                                ref={refButton}
                                type={isEdit ? 'submit' : 'button'}
                                variant={isEdit ? 'contained' : 'outlined'}
                                loading={isLoading}
                                onClick={() => {
                                    if (!isEdit) {
                                        setTimeout(() => {
                                            setIsEdit(!isEdit);
                                        }, 0);
                                    }
                                }}
                            >
                                {isEdit ? 'Update' : 'Edit'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
            {turnOn && (
                <Toast message={message} vertical="bottom" horizontal="right" turnOn={turnOn} />
            )}
        </Box>
    );
}
