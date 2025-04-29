import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

export default function PostTitile() {
    return (
        <div className="flex justify-between rounded-tl-2xl rounded-rl-2xl p-5 items-center border-b-1">
            <div className="flex gap-4 items-center">
                <Image
                    src="/next.svg"
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-b-full shadow-2xs w-10 h-10"
                />
                <div className="font-bold">Name</div>
            </div>
            <div className="gap-4">
                <MoreHorizIcon />
                <CloseIcon />
            </div>
        </div>
    );
}
