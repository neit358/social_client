import { Box } from '@mui/material';
import Image from 'next/image';

export default function PostImage({ image }: { image: string }) {
    return (
        <Box className="relative p-5">
            <Image
                src={image || './next.svg'}
                alt="Post image"
                width={800}
                height={500}
                className="w-full h-auto"
            />
        </Box>
    );
}
