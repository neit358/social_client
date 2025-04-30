'use client';
import { Box, Button, Card, CardContent, Modal, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { postService } from '@/services/post.services';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Toast from '../../toast';

interface FormData {
    title: string;
    content: string;
}

const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
});

export default function Register_post() {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const user = useSelector((state: RootState) => state.auth);
    const refInput = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [turnOn, setTurnOn] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onsubmit = async (data: FormData): Promise<void> => {
        try {
            const response = await postService.createPost(
                data.title,
                data.content,
                user.id,
                file as File,
            );
            setOpen(false);
            setPreview(null);
            setFile(null);
            setMessage(response.message);
            setTurnOn(true);
            setTimeout(() => {
                setTurnOn(false);
                setMessage(null);
            }, 3000);
        } catch {
            setMessage('Error creating post');
            setOpen(false);
            setTurnOn(true);
            setTimeout(() => {
                setTurnOn(false);
                setMessage(null);
            }, 3000);
        }
    };

    const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            setFile(file);
        }
    };

    return (
        <Card variant="outlined" className="rounded-r-2xl">
            <CardContent className="flex gap-3 items-center">
                <Box>
                    <Image src="/next.svg" alt="avatar" width={50} height={50} />
                </Box>

                <Box className="flex-1 group">
                    <TextField
                        type="text"
                        placeholder="What's on your mind?"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        onClick={() => setOpen(true)}
                        className="group-hover:bg-gray-100"
                    />

                    <Modal open={open} onClose={() => setOpen(false)}>
                        <Card
                            className="absolute top-1/2 left-1/2 w-[500px] p-4"
                            sx={{ transform: 'translate(-50%, -50%)' }}
                        >
                            <CardContent>
                                <form
                                    className="flex flex-col gap-4"
                                    onSubmit={handleSubmit(onsubmit)}
                                >
                                    <Box className="flex items-center gap-3">
                                        <Image
                                            src="/path/to/avatar.jpg"
                                            alt="avatar"
                                            width={50}
                                            height={50}
                                        />
                                        <Typography fontWeight="bold">User Name</Typography>
                                    </Box>

                                    <Box className="flex flex-col gap-1">
                                        <TextField
                                            label="Title"
                                            variant="filled"
                                            {...register('title')}
                                            error={!!errors.title}
                                            helperText={errors.title?.message}
                                        />
                                    </Box>

                                    <Box className="flex flex-col gap-1">
                                        <TextField
                                            label="Content"
                                            variant="filled"
                                            multiline
                                            minRows={4}
                                            maxRows={4}
                                            fullWidth
                                            {...register('content')}
                                            error={!!errors.content}
                                            helperText={errors.content?.message}
                                        />
                                    </Box>

                                    <Box
                                        className="relative flex justify-center items-center w-full h-40 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded"
                                        onClick={() => refInput.current?.click()}
                                    >
                                        {preview ? (
                                            <Image
                                                src={preview}
                                                alt="preview"
                                                fill
                                                style={{ objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                        ) : (
                                            <AddIcon fontSize="large" />
                                        )}
                                        <input
                                            type="file"
                                            onChange={handleAddImage}
                                            hidden
                                            ref={refInput}
                                            accept="image/jpeg, image/png, image/webp"
                                        />
                                    </Box>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={!!errors.title || !!errors.content}
                                    >
                                        Post
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Modal>
                </Box>
            </CardContent>
            {turnOn && (
                <Toast
                    vertical={'bottom'}
                    horizontal={'right'}
                    message={message || 'Chua xac dinh'}
                    turnOn={turnOn}
                />
            )}
        </Card>
    );
}
