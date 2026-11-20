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
  // The contact form email attaches the logo (lib/email/enquiry.ts), so the
  // server function has to ship with the file.
  outputFileTracingIncludes: {
    "/api/contact": ["./public/brand/sauti-logo-full.png"],
  },
  // The site used to have separate pages for these. Send old links and
  // search results to the matching part of the homepage instead of a 404.
  async redirects() {
    return [
      { source: "/about", destination: "/#team", permanent: true },
      { source: "/how-it-works", destination: "/#how", permanent: true },
      { source: "/pilot", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
