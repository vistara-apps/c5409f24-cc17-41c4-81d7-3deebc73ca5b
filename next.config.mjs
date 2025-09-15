/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  // Disable static generation to avoid wagmi context issues
  output: 'standalone',
  serverExternalPackages: ['@coinbase/onchainkit', 'wagmi', 'viem'],
};

export default nextConfig;
