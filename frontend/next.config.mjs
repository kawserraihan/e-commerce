/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false, // Disable source maps in production
    // other settings can go here

    images: {
      domains: ['demoapi.anticbyte.com', 'localhost'],
    },
  };
  
  // Add this line to verify during the build process
  console.log("Next.js config:", nextConfig);
  
  export default nextConfig;    
  