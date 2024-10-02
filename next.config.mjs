/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-dev.elred.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
