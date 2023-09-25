/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: [
            'i.imgur.com',
            'images.unsplash.com',
            'www.creativefabrica.com',
            'e0.pxfuel.com',
            'media.istockphoto.com'
        ],
    }
}

module.exports = nextConfig
