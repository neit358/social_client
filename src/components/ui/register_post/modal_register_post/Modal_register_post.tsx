import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Modal, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';

import { RootState } from '@/store';
import { FormData } from '@/types/formData';
import { postService } from '@/services/post.services';

const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
});

export default function ModalRegisterPost({
    setMessage,
    setTurnOn,
    setOpen,
    open,
    postId,
    type = 'post',
    reload,
    setReload,
}: {
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setTurnOn: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    postId?: string;
    type?: string;
    reload?: boolean;
    setReload?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const user = useSelector((state: RootState) => state.auth);
    const refInput = useRef<HTMLInputElement>(null);

    const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            setFile(file);
        }
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onsubmit = async (data: FormData): Promise<void> => {
        try {
            const response =
                type === 'edit' && postId
                    ? await postService.updatePost(postId, data.title, data.content, file as File)
                    : await postService.createPost(data.title, data.content, user.id, file as File);
            if (type !== 'edit' && !postId) setPreview(null);
            setFile(null);
            setOpen(false);
            setMessage(response.message);
            setTurnOn(true);
            if (setReload) {
                setReload(!reload);
            }
            setTimeout(() => {
                setTurnOn(false);
                setMessage('');
            }, 3000);
        } catch {
            setMessage('Error post api!');
            setOpen(false);
            setTurnOn(true);
            setTimeout(() => {
                setTurnOn(false);
                setMessage('');
            }, 3000);
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if (type === 'edit' && postId) {
                    const response = await postService.getPostById(postId);
                    setPreview(response.data.image);
                    reset({
                        title: response.data.title,
                        content: response.data.content,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchApi();
    }, [postId, reset, type]);

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Card
                className="absolute top-1/2 left-1/2 w-[500px] p-4"
                sx={{ transform: 'translate(-50%, -50%)' }}
            >
                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onsubmit)}>
                        <Box className="flex items-center gap-3">
                            <Image
                                src={user.avatar || '/next.svg'}
                                alt="avatar"
                                width={50}
                                height={50}
                            />
                            <Typography fontWeight="bold">{user.name}</Typography>
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
                                    width={100}
                                    height={100}
                                    src={preview}
                                    alt="preview"
                                    className="w-full h-full"
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
                            {type === 'edit' ? 'Apply' : 'Create'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Modal>
    );
}
