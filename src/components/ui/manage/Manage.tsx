'use client';

import { Box } from '@mui/material';
import React, { createContext, useEffect, useState } from 'react';

import { postService } from '@/services/post.services';
import { I_Post } from '@/types/post';
import ModalRegisterPost from '../register_post/modal_register_post/Modal_register_post';
import Toast from '../toast';
import EnhancedTable from '../table';
import Confirm from '../confirm';

export const ManageContext = createContext(null);

export interface HeadCell {
    disablePadding: boolean;
    id: keyof I_Post;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'id',
    },
    {
        id: 'title',
        numeric: true,
        disablePadding: false,
        label: 'Title',
    },
    {
        id: 'content',
        numeric: true,
        disablePadding: false,
        label: 'Content',
    },
    {
        id: 'image',
        numeric: true,
        disablePadding: false,
        label: 'Image',
    },
];

export default function Manage({ userId }: { userId: string }) {
    const [posts, setPosts] = useState<I_Post[]>([]);
    const [postId, setPostId] = useState<string>('');
    const [reload, setReload] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [openToast, setOpenToast] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(true);
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await postService.getPostsByUserId(userId);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchApi();
    }, [userId, reload]);

    const rows = posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        image: post.image,
    }));

    const handleClickEdit = (postId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setPostId(postId);
        setOpen(true);
    };

    const handleClickDelete = (selected: string[]) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setClose(false);
        setSelected(selected);
    };

    const handleConfirmDeletePost = async () => {
        try {
            const response = await postService.deletePosts(selected);
            setMessage(response.message);
            setOpenToast(true);
            setClose(true);
            setReload(!reload);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <Box className="pt-20">
            <EnhancedTable
                rows={rows}
                headCells={headCells}
                handleClickEdit={handleClickEdit}
                handleClickDelete={handleClickDelete}
            />
            <ModalRegisterPost
                setOpen={setOpen}
                open={open}
                postId={postId}
                setMessage={setMessage}
                setOpenToast={setOpenToast}
                type={'edit'}
                setReload={setReload}
                reload={reload}
            />
            <Toast
                openToast={openToast}
                setOpenToast={setOpenToast}
                message={message}
                horizontal="right"
                vertical="bottom"
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
        </Box>
    );
}
