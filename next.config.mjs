/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
    },
    reactStrictMode: false,
    images: {
        domains: ['image.tmdb.org'],
    },
};

export default nextConfig;