import type { NextConfig } from "next";

// Import env here to validate during build. Using jiti@^1 we can import .ts files :)

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
        protocol: "https",
      },
      {
        hostname: "i.pravatar.cc",
        protocol: "https",
      },
      {
        hostname: "img.clerk.com",
        protocol: "https",
      },
      {
        hostname: "ik.imagekit.io",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "randomuser.me",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
