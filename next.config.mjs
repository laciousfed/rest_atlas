/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  // Cloudflare Edge Runtime: stub out Node.js built-ins used by firebase-admin
  // so the edge bundler can compile without errors. Firebase Admin will safely
  // return null at runtime (isAdminConfigured() guard).
  webpack: (config, { nextRuntime }) => {
    if (nextRuntime === 'edge') {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: false,
        crypto: false,
        net: false,
        tls: false,
        fs: false,
        path: false,
        os: false,
        http: false,
        https: false,
        http2: false,
        zlib: false,
        child_process: false,
        worker_threads: false,
      };
    }
    return config;
  },
};

export default nextConfig;
