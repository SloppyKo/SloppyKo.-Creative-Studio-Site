import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Operations Portal page now lives as a section of the Portfolio page.
      {
        source: "/operations-portal",
        destination: "/portfolio#operations-portal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
