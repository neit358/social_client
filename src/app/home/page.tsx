import Register_post from '@/components/ui/home/register_post/Register_post';
import Post from '../../components/ui/home/post/Post';

export default async function Page() {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-[700px] flex flex-col gap-2">
                <Register_post />
                <Post />
            </div>
        </div>
    );
}
