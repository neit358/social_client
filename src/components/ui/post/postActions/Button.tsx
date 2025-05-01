import { JSX } from '@emotion/react/jsx-runtime';
import { useEffect, useState } from 'react';
import { likeService } from '@/services/like.services';

import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export default function ButtonPost({
    icon,
    quality,
    type,
    postId,
    setAction,
    action,
}: {
    icon: JSX.Element;
    quality?: number;
    type: string;
    postId?: string;
    setAction?: React.Dispatch<React.SetStateAction<boolean>>;
    action?: boolean;
}) {
    const [isLike, setIsLike] = useState(false);
    const user = useSelector((state: RootState) => state.auth);

    const handleClickButtonAction = () => {
        switch (type) {
            case 'like':
                if (!postId || !setAction) return;
                const fetchApi = async () => {
                    try {
                        const response = await likeService.actionLike(postId, user.id);
                        if (typeof response.data === 'boolean') setIsLike(false);
                        else setIsLike(true);
                        setAction(!action);
                    } catch (error) {
                        console.error('Error liking the post:', error);
                    }
                };

                fetchApi();
                break;
            case 'comment':
                console.log('Comment button clicked');
                break;
            case 'share':
                console.log('Share button clicked');
                break;
            default:
                console.log('Unknown action');
        }
    };

    useEffect(() => {
        switch (type) {
            case 'like':
                if (!postId) return;
                const fetchApi = async () => {
                    try {
                        await likeService.getLike(postId, user.id);
                        setIsLike(true);
                    } catch {
                        setIsLike(false);
                    }
                };
                fetchApi();
                break;
            case 'comment':
                console.log('Comment button clicked');
                break;
            case 'share':
                console.log('Share button clicked');
                break;
            default:
                console.log('Unknown action');
        }
    }, [type, postId, user.id]);

    return (
        <div
            className="flex flex-col items-center justify-center w-full hover:bg-amber-50 py-2 transition-colors cursor-pointer"
            onClick={handleClickButtonAction}
        >
            <div
                className="flex items-center gap-1 text-gray-600"
                style={
                    isLike
                        ? {
                              color: '#f59e0b',
                          }
                        : {
                              color: '#4a5565',
                          }
                }
            >
                {icon}
                {quality !== undefined && <span className="text-sm font-semibold">{quality}</span>}
            </div>
        </div>
    );
}
