import { Card, CardContent } from '@mui/material';
import PostActions from './PostActions';
import PostContent from './PostContent';
import PostImage from './PostImage';
import PostTitile from './PostTitle';

export default function Post() {
    return (
        <Card>
            <CardContent>
                <PostTitile></PostTitile>
                <PostContent></PostContent>
                <PostImage></PostImage>
                <PostActions></PostActions>
            </CardContent>
        </Card>
    );
}
