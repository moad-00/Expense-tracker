
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    proxy: {
      '/api': {
        target: 'https://rosy-marilee-hyperpathetical.ngrok-free.dev',
        changeOrigin: true,
        secure: false, 
      }
    }
  }
})
