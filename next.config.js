/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {//loader: 'default'
      remotePatterns: [
        {
          protocol: "https",
          hostname: "upload.wikimedia.org",
          //hostname: 'images.unsplash.com'
        },
      ],
    },
  };
  
  module.exports = nextConfig