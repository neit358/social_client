import Image from 'next/image';

export default function PostImage({ image }: { image: string }) {
    return (
        <div className="relative p-5">
            <Image
                src={image}
                alt="Post image"
                fill
                style={{
                    objectFit: 'cover',
                }}
            />
        </div>
    );
}
