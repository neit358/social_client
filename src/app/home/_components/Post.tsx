import PostActions from './PostActions';
import PostContent from './PostContent';
import PostImage from './PostImage';
import PostTitile from './PostTitle';

export default function Post() {
    return (
        <div className="rounded-2xl w-[700px] shadow-xl">
            <PostTitile></PostTitile>
            <PostContent></PostContent>
            <PostImage></PostImage>
            <PostActions></PostActions>
        </div>
    );
}
