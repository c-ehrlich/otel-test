/** @type {import('next').NextConfig} */
const nextConfg = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize problematic packages to avoid bundling issues
      config.externals = config.externals || [];
      config.externals.push('require-in-the-middle');
    }
    return config;
  },
};

module.exports = nextConfig;
