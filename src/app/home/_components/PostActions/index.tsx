import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ReplyIcon from '@mui/icons-material/Reply';
import Button from './Button';

export default function PostActions() {
    return (
        <div className="flex justify-between border-t-1 rounded-bl-2xl rounded-br-2xl px-5 py-2">
            <Button icon={<ThumbUpIcon />} />
            <Button icon={<ModeCommentIcon />} />
            <Button icon={<ReplyIcon />} />
        </div>
    );
}
