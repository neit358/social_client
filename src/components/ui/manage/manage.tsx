import { postService } from '@/services/post.services';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Manage({ userId }: { userId: string }) {
    const user = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await postService.getPostsByUserId(user.id);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchApi();
    });

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Manage</h1>
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">User</h2>
                <p>User ID: {userId}</p>
            </div>
        </div>
    );
}
