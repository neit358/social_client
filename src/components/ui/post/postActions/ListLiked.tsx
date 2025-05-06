import { postService } from '@/services/post.services';
import { I_User } from '@/types/user';
import { Card, CardContent, Modal } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ListLiked({
    postId,
    setShowListLiked,
    showListLiked,
}: {
    postId: string;
    setShowListLiked: React.Dispatch<React.SetStateAction<boolean>>;
    showListLiked: boolean;
}) {
    const [users, setUsers] = useState<I_User[]>([]);

    useEffect(() => {
        const fetchApi = async () => {
            if (!postId) return;
            try {
                const response = await postService.getUserLikedByPostId(postId);
                if (response.statusCode === 200) {
                    setUsers(response.data.likes.map((like: { user: I_User }) => like.user));
                }
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };
        fetchApi();
    }, [postId]);

    return (
        <Modal
            open={showListLiked}
            onClose={(event: React.MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                setShowListLiked(false);
            }}
            className="flex items-center justify-center"
        >
            <Card
                sx={{
                    minWidth: 400,
                    borderRadius: 4,
                    boxShadow: 5,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    outline: 'none',
                }}
            >
                <CardContent>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-center border-b pb-2 mb-4">
                            List of Likes
                        </h2>
                        <div className="space-y-3">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center gap-3 hover:bg-gray-100 rounded-lg p-2 transition"
                                >
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="font-medium">{user.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Modal>
    );
}
