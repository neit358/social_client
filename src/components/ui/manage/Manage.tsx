'use client';

import { Box } from '@mui/material';
import React, { createContext, useState } from 'react';

import { postService } from '@/services/post.services';
import { I_Post } from '@/types/post.interface';
import ModalRegisterPost from '../register_post/modal_register_post/Modal_register_post';
import Toast from '../toast';
import Confirm from '../confirm';
import { GridColDef } from '@mui/x-data-grid';
import Table from '../table';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { usePosts } from '@/hooks/post.hook';

export const ManageContext = createContext(null);

const paginationModel = { page: 0, pageSize: 5 };

export default function Manage({ userId }: { userId: string }) {
    const [postId, setPostId] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openToast, setOpenToast] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(true);
    const [selected, setSelected] = useState<string[]>([]);

    const { data: posts, isLoading, refetch } = usePosts(userId);

    const rows =
        posts?.map((post: I_Post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            image: post.image,
        })) || [];

    const handleClickEdit = (postId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpenModal(true);
        setPostId(postId);
    };

    const handleClickDelete = (selected: string[]) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setClose(false);
        setSelected(selected);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'content', headerName: 'Content', flex: 1 },
        {
            field: 'image',
            headerName: 'Image',
            flex: 1,
            renderCell: (params) => (
                <div style={{ position: 'relative', height: 50, width: 'auto' }}>
                    <Image src={params.value} alt="Post" fill style={{ objectFit: 'cover' }} />
                </div>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div className="flex gap-2 h-full">
                    <button
                        onClick={handleClickEdit(params.row.id)}
                        className="flex items-center justify-center w-12 h-full hover:bg-gray-200 p-2 rounded-full"
                    >
                        <EditIcon />
                    </button>
                    <button
                        onClick={handleClickDelete([params.row.id])}
                        className="flex items-center justify-center w-12 h-full hover:bg-gray-200 p-2 rounded-full"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            ),
        },
    ];

    const handleConfirmDeletePost = async () => {
        try {
            const response = await postService.deletePosts(selected);
            setMessage(response.message);
            setOpenToast(true);
            setClose(true);
            refetch();
        } catch {
            setMessage('Error deleting post');
            setOpenToast(true);
        }
    };

    return (
        <>
            <Box className="pt-20 p-4">
                <h1 className="text-2xl font-bold text-center">Manage Posts</h1>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => {
                            setPostId('');
                            setOpenModal(true);
                        }}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition-all"
                    >
                        Create Post
                    </button>
                </div>
                <div className="bg-white border border-gray-200 shadow rounded-xl p-4">
                    <Table
                        columns={columns}
                        rows={rows}
                        paginationModel={paginationModel}
                        loading={isLoading}
                    />
                </div>
            </Box>
            <ModalRegisterPost
                setOpenModal={setOpenModal}
                openModal={openModal}
                postId={postId}
                setMessage={setMessage}
                setOpenToast={setOpenToast}
                type={'edit'}
            />
            <Confirm
                title="Delete"
                message="Do you want delete post?"
                btnAgree="Ok"
                btnDisagree="Cancel"
                onClose={() => setClose(true)}
                open={!close}
                onConfirm={handleConfirmDeletePost}
            />
            <Toast
                openToast={openToast}
                setOpenToast={setOpenToast}
                message={message}
                horizontal="right"
                vertical="bottom"
            />
        </>
    );
}
