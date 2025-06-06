/** 
  @type {import('next').NextConfig} 
  */
const nextConfig = {
  reactStrictMode: true, // This should be outside of experimental
  experimental: {
    // Your experimental features go here
    // appDir: true,
    // swcMinify: true
  },

  webpack(config, { isServer }) {
    // If we are on the server, we can safely exclude lodash and jsonwebtoken from being bundled
    if (isServer) {
      config.externals = ['lodash', 'jsonwebtoken', ...config.externals];
    }

    // Add a rule to exclude lodash and jsonwebtoken from being included in the Edge runtime bundle
    config.module.rules.push({
      test: /lodash|jsonwebtoken/,
      loader: 'null-loader', // Ignore lodash and jsonwebtoken completely for Edge functions
    });

    // Return the updated Webpack config
    return config;
  }
};

export default nextConfig; // Use ES module export syntax
