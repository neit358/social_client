'use client';
import { Card, CardContent } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import Toast from '../toast';
import ModalRegisterPost from './modal_register_post/Modal_register_post';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function Register_post() {
    const [openModal, setOpenModal] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState<string>('');

    const user = useSelector((state: RootState) => state.auth);

    const handleOpenModalRegisterPost = () => {
        if (user.id) {
            setOpenModal(true);
        } else {
            setMessage('Please login to create a post!');
            setOpenToast(true);
        }
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent className="flex gap-3 items-center">
                <Image
                    src={user.avatar || '/next.svg'}
                    alt="avatar"
                    width={50}
                    height={50}
                    className="w-12 h-12 object-cover rounded-full border-1 border-gray-300"
                />
                <input
                    placeholder="What's on your mind?"
                    className="w-full p-3 bg-gray-200 outline-none rounded-2xl cursor-pointer hover:bg-gray-300 "
                    onClick={handleOpenModalRegisterPost}
                    readOnly
                    type="text"
                    style={{ cursor: 'pointer' }}
                />
            </CardContent>
            <ModalRegisterPost
                setOpenToast={setOpenToast}
                setMessage={setMessage}
                setOpenModal={setOpenModal}
                openModal={openModal}
            />
            <Toast
                vertical={'bottom'}
                horizontal={'right'}
                message={message || 'Chua xac dinh'}
                openToast={openToast}
                setOpenToast={setOpenToast}
            />
        </Card>
    );
}
