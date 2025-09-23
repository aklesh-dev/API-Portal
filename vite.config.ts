import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
     '/api': {
        target: 'http://124.41.227.48:8099',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            if(req.headers["authorization"]) {
              proxyReq.setHeader("authorization", req.headers["authorization"])
            }
          })
        }
      },
    }
  },
  
})
