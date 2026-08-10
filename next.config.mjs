import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ['192.168.1.21', 'local-origin.dev', '*.local-origin.dev'],
    async rewrites() {
        return [
            {
                source: '/luum',
                destination: '/product?category=luum',
            },
            {
                source: '/nichiha',
                destination: '/product?category=nichiha',
            },
        ];
    },
};

export default withFlowbiteReact(nextConfig);