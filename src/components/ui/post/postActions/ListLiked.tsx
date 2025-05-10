import { Card, CardContent, Modal } from '@mui/material';
import CircularIndeterminate from '../../CircularIndeterminate';

import { I_User } from '@/types/user.interface';
import Image from 'next/image';

export default function ListLiked({
    setShowListLiked,
    showListLiked,
    isLoading,
    users,
}: {
    setShowListLiked: React.Dispatch<React.SetStateAction<boolean>>;
    showListLiked: boolean;
    isLoading: boolean;
    users: I_User[];
}) {
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
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                    event.stopPropagation();
                }}
            >
                <CardContent>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-center border-b pb-2 mb-4">
                            List of Likes
                        </h2>

                        {isLoading ? (
                            <CircularIndeterminate />
                        ) : (
                            <div className="space-y-3">
                                {users?.map((user: I_User) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center gap-3 hover:bg-gray-100 rounded-lg p-2 transition"
                                    >
                                        <Image
                                            src={user.avatar || '/next.svg'}
                                            alt={user.name}
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 rounded-full object-cover border-1 border-gray-300"
                                        />
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Modal>
    );
}
