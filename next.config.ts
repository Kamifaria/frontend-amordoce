import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Allow canvas getImageData on all local sprite/image assets
        source: '/images/:path*',
        headers: [
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;
