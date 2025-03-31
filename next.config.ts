import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 
  •	config options here 
  •	serverActions：开启 Next.js 服务器端 Action（Server Actions）。
	•	bodySizeLimit: "100mb"：
	•	允许 POST 请求的 body 体积 最大 100MB，否则默认是 1MB。
	•	适用于 文件上传、大型 JSON 处理等。
  */
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
    ],
  },
};

export default nextConfig;
