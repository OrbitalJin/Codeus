/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ui-avatars.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "randomuser.me",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
