import { JSX } from '@emotion/react/jsx-runtime';

import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useCreateReaction, useLike } from '@/hooks/like.hook';

interface I_ButtonPost {
    icon: JSX.Element;
    type: string;
    postId: string;
}

export default function ButtonPost({ icon, type, postId }: I_ButtonPost) {
    const user = useSelector((state: RootState) => state.auth);

    const { data: like } = useLike(postId, user.id);
    const { mutate } = useCreateReaction();

    const handleClickButtonAction = () => {
        switch (type) {
            case 'like':
                console.log('like');
                mutate({
                    postId: postId,
                    userId: user.id,
                });
                break;
            case 'comment':
                break;
            case 'share':
                break;
        }
    };

    return (
        <div
            className="w-full flex items-center justify-center gap-1 cursor-pointer p-2 hover:bg-gray-100 transition-colors"
            onClick={handleClickButtonAction}
        >
            {(() => {
                switch (type) {
                    case 'like':
                        return (
                            <div
                                className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                                    like?.isLiked ? 'text-amber-500' : 'text-gray-500'
                                }`}
                            >
                                {icon}
                            </div>
                        );
                    default:
                        return (
                            <div
                                className={`flex items-center gap-1 text-sm font-semibold transition-colors text-gray-500`}
                            >
                                {icon}
                            </div>
                        );
                }
            })()}

            <p>{type}</p>
        </div>
    );
}
