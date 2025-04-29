import { Card, CardContent } from '@mui/material';
import PostActions from './PostActions';
import PostContent from './PostContent';
import PostImage from './PostImage';
import PostTitile from './PostTitle';
import { I_Post } from '@/types/post';

export default function Post({ id, title, content, image, userId }: I_Post) {
    return (
        <Card variant="outlined">
            <CardContent>
                <PostTitile title={title}></PostTitile>
                <PostContent content={content}></PostContent>
                <PostImage image={image}></PostImage>
                <PostActions postId={id}></PostActions>
            </CardContent>
        </Card>
    );
}
