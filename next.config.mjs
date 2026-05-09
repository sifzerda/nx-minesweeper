// next.config.mjs

const nextConfig = {
  reactStrictMode: true,

  // REQUIRED FOR TAURI
  output: "export",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;