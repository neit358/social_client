import { I_Post } from '@/types/post';
import { Box } from '@mui/material';

export default function PostTitile({ title }: Partial<I_Post>) {
    return (
        <Box>
            <div className="font-bold text-lg p-2 ">
                <u>{title}</u>
            </div>
        </Box>
    );
}
