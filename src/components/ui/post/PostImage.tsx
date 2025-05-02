import Image from 'next/image';

export default function PostImage({ image }: { image: string }) {
    return (
        <div className="relative p-5">
            <Image
                src={image}
                alt="Post image"
                width={500}
                height={500}
                className="w-full h-full"
            />
        </div>
    );
}
