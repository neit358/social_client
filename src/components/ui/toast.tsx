'use client';
import { Box, Snackbar } from '@mui/material';
import { useState } from 'react';

export default function Toast({
    message,
    vertical,
    horizontal,
    turnOn,
}: {
    message: string;
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
    turnOn: boolean;
}) {
    const [open, setOpen] = useState(turnOn);
    return (
        <Box>
            <Snackbar
                onClose={() => setOpen(false)}
                open={open}
                message={message}
                anchorOrigin={{
                    vertical,
                    horizontal,
                }}
                key={vertical + horizontal}
                autoHideDuration={3000}
            />
        </Box>
    );
}
