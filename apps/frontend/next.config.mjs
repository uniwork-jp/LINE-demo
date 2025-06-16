/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@line-demo/shared'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
      '@line-demo/shared': '../../packages/shared/src/index',
      '@line-demo/shared/*': '../../packages/shared/src/*'
    };
    return config;
  }
};

export default nextConfig; 