import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: `${env.PROXY_URL}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/upbit-api": {
          target: `${env.PROXY_UPBIT_URL}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/upbit-api/, ""),
        },
      },
    },
  };
});
