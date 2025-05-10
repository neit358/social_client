import { I_Post } from '@/types/post.interface';
import { Box } from '@mui/material';

export default function PostTitle({ title }: Partial<I_Post>) {
    return (
        <Box className="px-4 pt-4 pb-2">
            <h1 className="text-2xl font-semibold text-gray-800 border-l-4 border-yellow-500 pl-3 leading-snug">
                {title}
            </h1>
        </Box>
    );
}
