import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Cau hinh cho phep dung domain ben ngoai
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3001',
                pathname: '/uploads/**',
            },
        ],
    },
};

export default nextConfig;
