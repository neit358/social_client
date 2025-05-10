import Image from 'next/image';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useUser } from '@/hooks/user.hook';
import { I_User } from '@/types/user.interface';

export default function PostInformation({ user, userId }: { user: I_User; userId: string }) {
    const { data: responseUser } = useUser(userId);
    return (
        <Box className="flex justify-between items-center px-4 py-3 rounded-t-2xl bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                    <Image
                        src={user?.avatar || responseUser?.avatar || '/images/default-avatar.png'}
                        alt="avatar"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                        {user?.name || responseUser?.name}
                    </span>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
            </div>
            <div className="flex gap-2 text-gray-400">
                <button className="p-1 rounded-full hover:bg-gray-100 transition">
                    <MoreHorizIcon className="text-xl hover:text-black" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100 transition">
                    <CloseIcon className="text-xl hover:text-black" />
                </button>
            </div>
        </Box>
    );
}
