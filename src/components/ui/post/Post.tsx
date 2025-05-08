import { Card, CardContent } from '@mui/material';

import PostContent from './PostContent';
import PostImage from './PostImage';
import { I_Post } from '@/types/post';
import PostInformation from './PostInformation';
import PostActions from './postActions/PostActions';
import PostTitle from './PostTitle';

export default function Post({ id, title, content, image, user }: I_Post) {
    return (
        <Card variant="outlined" sx={{ minWidth: 400, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
                <PostInformation user={user}></PostInformation>
                <PostTitle title={title}></PostTitle>
                <PostContent content={content}></PostContent>
                <PostImage image={image}></PostImage>
                <PostActions id={id}></PostActions>
            </CardContent>
        </Card>
    );
}
