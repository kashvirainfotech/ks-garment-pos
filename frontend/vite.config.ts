import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [reactRouter()],
    server: {
      proxy: {
        "/api": {
          target: env.API_PROXY_TARGET || "http://127.0.0.1:3000",
          changeOrigin: true,
        },
      },
    },
  };
});
