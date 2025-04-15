/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'd91134pq6d.ufs.sh',
          },
        ],
      },
};

export default nextConfig;
