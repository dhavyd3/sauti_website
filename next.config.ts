import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

// This computer's own addresses on the local network (e.g. 192.168.1.5).
// The dev server only serves its scripts to localhost unless told otherwise,
// so without these a phone on the same Wi-Fi gets the page with no scripts.
// Development only: production builds ignore allowedDevOrigins.
const lanHosts = Object.values(networkInterfaces())
  .flat()
  .filter((net) => net && net.family === "IPv4" && !net.internal)
  .map((net) => net!.address);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: lanHosts,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
