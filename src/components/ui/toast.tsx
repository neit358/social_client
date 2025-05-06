'use client';
import { Box, Snackbar } from '@mui/material';

export default function Toast({
    message,
    vertical = 'bottom',
    horizontal = 'right',
    openToast,
    setOpenToast,
}: {
    message: string;
    vertical?: 'top' | 'bottom';
    horizontal?: 'left' | 'right';
    openToast: boolean;
    setOpenToast: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Box>
            <Snackbar
                onClose={() => setOpenToast(false)}
                open={openToast}
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
