import Image from 'next/image';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { I_User } from '@/types/user';

export default function PostInformation({ user }: { user: I_User }) {
    return (
        <Box className="flex justify-between rounded-tl-2xl rounded-rl-2xl py-3 px-2 items-center border-b-1 border-gray-300">
            <div className="flex gap-4 items-center">
                <Image
                    src={user?.avatar || './next.svg'}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full w-15 h-15 object-cover border-1 border-gray-300"
                />
                <div className="font-bold">{user?.name}</div>
            </div>
            <div className="flex gap-2 text-gray-400">
                <MoreHorizIcon className="hover:text-black" />
                <CloseIcon className="hover:text-black" />
            </div>
        </Box>
    );
}
