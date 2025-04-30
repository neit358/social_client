import { Box } from '@mui/material';

export default function PostContent({ content }: { content: string }) {
    return <Box className="py-3 px-2">{content}</Box>;
}
