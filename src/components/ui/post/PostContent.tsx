import { I_Post } from '@/types/post.interface';
import { Box } from '@mui/material';

export default function PostContent({ content }: Partial<I_Post>) {
    return <Box className="py-3 px-5">{content}</Box>;
}
