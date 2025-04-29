'use client';

import * as Yup from 'yup';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import React, { useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardContent, TextField } from '@mui/material';

import { RootState } from '@/store';
import { userService } from '@/services/user.services';

interface FormDataUser {
    name: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
});

export default function User() {
    const [isEdit, setIsEdit] = useState(false);
    const user = useSelector((state: RootState) => state.auth);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [priview, setPriview] = useState('/image/h2.webp');
    const [file, setFile] = useState<File | null>(null);
    const refButton = useRef<HTMLButtonElement | null>(null);

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
        console.log('data', data);
        // setIsLoading(true);
        // const formData = new FormData();
        // if (file) formData.append('image', file);
        // await userService.updateUser(user.id, { name: data.name }, formData);
        // setIsEdit(!isEdit);
    };

    function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];
        if (file) {
            setPriview(URL.createObjectURL(file));
            setFile(file);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Card sx={{ minWidth: 300 }}>
                <CardContent>
                    <form
                        className="flex flex-col items-center justify-center h-full gap-y-4 bg"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h1 className="text-2xl font-bold">Profile</h1>
                        <div
                            className="flex flex-col items-center relative group"
                            onClick={hanldeClickChangeAvatar}
                        >
                            <Image
                                src={priview}
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
                        <div className="flex flex-col">
                            <TextField
                                label="Name"
                                disabled={!isEdit}
                                {...register('name')}
                            ></TextField>
                            {errors.name && errors.name.message}
                        </div>
                        <Button
                            ref={refButton}
                            type={isEdit ? 'submit' : 'button'}
                            variant={isEdit ? 'contained' : 'outlined'}
                            loading={isLoading}
                            onClick={() => {
                                if (!isEdit) setIsEdit(!isEdit);
                            }}
                        >
                            {isEdit ? 'Update' : 'Edit'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
