import { Card, CardContent } from '@mui/material';

import PostContent from './PostContent';
import PostImage from './PostImage';
import { I_Post } from '@/types/post.interface';
import PostInformation from './PostInformation';
import PostActions from './postActions/PostActions';
import PostTitle from './PostTitle';

export default function Post({ id, title, content, image, user, userId }: I_Post) {
    return (
        <Card variant="outlined" sx={{ minWidth: 400, borderRadius: 3, boxShadow: 5 }}>
            <CardContent>
                <PostInformation user={user} userId={userId}></PostInformation>
                <PostTitle title={title}></PostTitle>
                <PostContent content={content}></PostContent>
                <PostImage image={image}></PostImage>
                <PostActions id={id}></PostActions>
            </CardContent>
        </Card>
    );
}
