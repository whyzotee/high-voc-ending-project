/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [process.env.NEXT_PUBLIC_SUPABASE_URL.split("//")[1]],
    }
}

module.exports = nextConfig
