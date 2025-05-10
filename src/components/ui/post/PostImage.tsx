import { I_Post } from '@/types/post.interface';
import { Box } from '@mui/material';
import Image from 'next/image';

export default function PostImage({ image }: Partial<I_Post>) {
    return (
        <Box className="relative p-5">
            <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-md bg-gray-100 aspect-[16/9] relative">
                <Image
                    src={image || '/images/fallback-image.jpg'}
                    alt="Post image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                />
            </div>
        </Box>
    );
}
