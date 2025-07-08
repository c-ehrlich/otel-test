/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize problematic packages to avoid bundling issues
      config.externals = config.externals || [];
      config.externals.push('require-in-the-middle');
      config.externals.push('handlebars');
      config.externals.push('nunjucks');
    }
    return config;
  },
};

module.exports = nextConfig;
