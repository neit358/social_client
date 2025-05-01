import { Box, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';

import Confirm from '../../confirm';
import { postService } from '@/services/post.services';
import Toast from '../../toast';
import ModalRegisterPost from '../../register_post/modal_register_post/modal_register_post';
import { I_Post } from '@/types/post';

export default function ButtonPostEdit({
    type,
    titleConfirm = 'Confirm',
    messageConfirm = 'Do you want to delete this post?',
    children,
    postId,
    setReload,
    reload,
}: {
    type: string;
    titleConfirm?: string;
    messageConfirm?: string;
    children: React.ReactNode;
    postId: string;
    setReload?: React.Dispatch<React.SetStateAction<boolean>>;
    reload?: boolean;
}) {
    const [message, setMessage] = useState<string | null>('');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [turnOn, setTurnOn] = useState(false);
    const [post, setPost] = useState<I_Post | null>(null);

    const handleClick = async () => {
        switch (type) {
            case 'edit':
                const response = await postService.getPostById(postId);
                setPost(response.data);
                setOpenRegister(true);
                break;
            case 'delete':
                setOpenConfirm(true);
                break;
            default:
                console.log('Unknown action');
        }
    };

    const handleComfirm = async () => {
        if (!setReload) return;
        try {
            await postService.deletePost(postId);
            setTurnOn(true);
            setOpenConfirm(false);
            setReload(!reload);
        } catch (error) {
            console.log('Error deleting post:', error);
        }
    };

    return (
        <div className="flex-1 flex justify-center items-center mt-2 ">
            <Tooltip title="Chỉnh sua" placement="top">
                <Box>
                    <IconButton color="primary" onClick={handleClick}>
                        {children}
                    </IconButton>
                    <Confirm
                        open={openConfirm}
                        onConfirm={handleComfirm}
                        onClose={() => setOpenConfirm(false)}
                        title={titleConfirm}
                        message={messageConfirm}
                        btnAgree={'Ok'}
                        btnDisagree={'Cancel'}
                    />
                </Box>
            </Tooltip>

            <ModalRegisterPost
                setOpen={setOpenRegister}
                open={openRegister}
                postId={postId}
                title={post?.title}
                content={post?.content}
                image={post?.image}
                setMessage={setMessage}
                setTurnOn={setTurnOn}
                type={'edit'}
            />

            {turnOn && (
                <Toast
                    message={message || 'Chua xac dinh'}
                    turnOn={turnOn}
                    horizontal="right"
                    vertical="bottom"
                    key={postId}
                />
            )}
        </div>
    );
}
