'use client';
import { Box, Card, CardContent, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import Toast from '../toast';
import ModalRegisterPost from './modal_register_post/Modal_register_post';

export default function Register_post() {
    const [open, setOpen] = useState(false);
    const [turnOn, setTurnOn] = useState(false);
    const [message, setMessage] = useState<string>('');

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
                </Box>
            </CardContent>
            <ModalRegisterPost
                setTurnOn={setTurnOn}
                setMessage={setMessage}
                setOpen={setOpen}
                open={open}
            />
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
