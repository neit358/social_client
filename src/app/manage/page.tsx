'use client';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import Header from '@/components/Header';
import Manage from '@/components/ui/manage/manage';

export default function Page() {
    const user = useSelector((state: RootState) => state.auth);
    return (
        <Box>
            <Header />
            <Manage userId={user.id} />
        </Box>
    );
}
