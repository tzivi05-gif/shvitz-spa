import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: __dirname,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "base-uri 'self'; " +
              "form-action 'self'; " +
              "frame-ancestors 'none'; " +
              "img-src 'self' data: blob: https://api.qrserver.com; " +
              "font-src 'self' data:; " +
              "style-src 'self' 'unsafe-inline'; " +
              "script-src 'self'; " +
              "connect-src 'self'; " +
              "object-src 'none'",
          },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "0" },
        ],
      },
    ];
  },
};

export default nextConfig;
