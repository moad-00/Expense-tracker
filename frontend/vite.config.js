// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows network access (localhost + LAN)
    proxy: {
      '/api': {
        target: 'https://rosy-marilee-hyperpathetical.ngrok-free.dev',
        changeOrigin: true,
        secure: false, // only if ngrok uses self-signed certificate
      }
    }
  }
})
