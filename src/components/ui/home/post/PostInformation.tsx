import { Box } from '@mui/material';
import Image from 'next/image';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import { I_Post } from '@/types/post';
import { useEffect, useState } from 'react';
import { userService } from '@/services/user.services';
import { I_User } from '@/types/user';

export default function PostInformation({ userId }: Partial<I_Post>) {
    const [artist, setArtist] = useState<I_User | null>(null);

    useEffect(() => {
        const fetchAPI = async () => {
            if (!userId) return;
            try {
                const response = await userService.getUser(userId);
                console.log(response.data);
                setArtist(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchAPI();
    }, [userId]);

    return (
        <Box className="flex justify-between rounded-tl-2xl rounded-rl-2xl py-3 px-2 items-center border-b-1 border-gray-300">
            <div className="flex gap-4 items-center">
                <Image
                    src={artist?.image || ''}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-b-full shadow-2xl border-1 w-10 h-10"
                />
                <div className="font-bold">{artist?.name}</div>
            </div>
            <div className="flex gap-2 text-gray-400">
                <MoreHorizIcon className="hover:text-black" />
                <CloseIcon className="hover:text-black" />
            </div>
        </Box>
    );
}
