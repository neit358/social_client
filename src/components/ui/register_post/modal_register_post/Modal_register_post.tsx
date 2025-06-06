import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Modal, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';

import { RootState } from '@/store';
import { postService } from '@/services/post.services';
import { useCreatePost, useUpdatePost } from '@/hooks/post.hook';
import { useQueryClient } from '@tanstack/react-query';

interface FormData {
    title: string;
    content: string;
}

const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
});

export default function ModalRegisterPost({
    setMessage,
    setOpenToast,
    setOpenModal,
    openModal,
    postId,
}: {
    type?: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setOpenToast: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    openModal: boolean;
    postId?: string;
}) {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const user = useSelector((state: RootState) => state.auth);
    const refInput = useRef<HTMLInputElement>(null);

    const { mutate: createPost } = useCreatePost();
    const { mutate: updatePost } = useUpdatePost();

    const userId = useSelector((state: RootState) => state.sidebar.userId);
    const search = useSelector((state: RootState) => state.header.search);

    const queryClient = useQueryClient();

    const handleAddImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            setFile(file);

            // ===========================================================================

            const data = new FormData();

            data.append('files', file);
            await postService.uploadNotChunkFile(data);

            // const chunkSize = 10 * 1024 * 1024, // 10MB
            //     chunks = [];

            // let startPos = 0;

            // while (startPos < file.size) {
            //     chunks.push(file.slice(startPos, startPos + chunkSize));
            //     startPos += chunkSize;
            // }

            // if (chunks.length === 0) return;

            // const nameRandom = Math.random().toString().slice(2, 6);

            // const chunkPromises = chunks.map((chunk, index) => {
            //     const data = new FormData();
            //     data.set(
            //         'name',
            //         `${nameRandom}-${file.name.replace(/\s+/g, '').toLocaleLowerCase()}-${index}`,
            //     );
            //     data.append('files', chunk);
            //     return postService.uploadLargeFile(data);
            // });
            // await Promise.all(chunkPromises);
            // await postService.mergeLargeFile(
            //     `${nameRandom}-${file.name.replace(/\s+/g, '').toLocaleLowerCase()}`,
            // );
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
        if (postId) {
            updatePost(
                {
                    postId,
                    title: data.title,
                    content: data.content,
                    image: file as File,
                },
                {
                    onSuccess: () => {
                        setPreview(null);
                        setFile(null);
                        setOpenModal(false);
                        setOpenToast(true);
                        setMessage('Update post success!');
                        queryClient.invalidateQueries({ queryKey: ['postsByUserId', user.id] });
                    },
                    onError: () => {
                        setOpenToast(true);
                        setMessage('Error post api!');
                        setOpenModal(false);
                    },
                },
            );
        } else {
            createPost(
                {
                    title: data.title,
                    content: data.content,
                    userId: user.id,
                    image: file as File,
                },
                {
                    onSuccess: () => {
                        setPreview(null);
                        setFile(null);
                        setOpenModal(false);
                        setOpenToast(true);
                        setMessage('Create post success!');
                        queryClient.invalidateQueries({ queryKey: ['posts', userId, search] });
                    },
                    onError: () => {
                        setOpenToast(true);
                        setMessage('Error post api!');
                        setOpenModal(false);
                    },
                },
            );
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if (postId) {
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
    }, [postId, reset]);

    return (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Card
                className="absolute top-1/2 left-1/2 w-[500px] p-4"
                sx={{ transform: 'translate(-50%, -50%)', borderRadius: 3 }}
            >
                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onsubmit)}>
                        <Box className="flex items-center gap-3">
                            <Image
                                src={user.avatar || '/next.svg'}
                                alt="avatar"
                                width={50}
                                height={50}
                                className="rounded-full w-15 h-15 object-cover border-1 border-gray-300"
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
                                sx={{
                                    '& .MuiFilledInput-root': {
                                        borderTopLeftRadius: 8,
                                        borderTopRightRadius: 8,
                                    },
                                }}
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
                                sx={{
                                    '& .MuiFilledInput-root': {
                                        borderTopLeftRadius: 8,
                                        borderTopRightRadius: 8,
                                    },
                                }}
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
                                    className="w-full h-full object-cover rounded border-1 border-gray-300"
                                />
                            ) : (
                                <AddIcon fontSize="large" />
                            )}
                            <input
                                type="file"
                                multiple
                                onChange={handleAddImage}
                                hidden
                                ref={refInput}
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!!errors.title || !!errors.content}
                        >
                            {postId ? 'Apply' : 'Create'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Modal>
    );
}
