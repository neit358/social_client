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
                    objectPosition: 'center',
                    borderRadius: '0 0 20px 20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s ease',
                    aspectRatio: '1 / 2',
                    width: '100%',
                }}
            />
        </div>
    );
}
