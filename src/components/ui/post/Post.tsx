import { Card, CardContent } from '@mui/material';

import PostContent from './PostContent';
import PostImage from './PostImage';
import PostTitile from './PostTitle';
import { I_Post } from '@/types/post';
import PostInformation from './PostInformation';
import PostActions from './postActions/PostActions';

export default function Post({
    id,
    title,
    content,
    image,
    userId,
}: I_Post & {
    type?: 'post' | 'edit';
    setReload?: React.Dispatch<React.SetStateAction<boolean>>;
    reload?: boolean;
}) {
    return (
        <Card variant="outlined" sx={{ minWidth: 400 }}>
            <CardContent>
                <PostInformation userId={userId}></PostInformation>
                <PostTitile title={title}></PostTitile>
                <PostContent content={content}></PostContent>
                <PostImage image={image}></PostImage>
                <PostActions id={id}></PostActions>
            </CardContent>
        </Card>
    );
}
