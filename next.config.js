
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.hydrogen.co;"
          }
        ],
      },
    ]
  },
  scripts: [
    {
      src: "https://js.hydrogen.co/v1/inline.js",
      strategy: "beforeInteractive"
    }
  ]
}

module.exports = nextConfig
