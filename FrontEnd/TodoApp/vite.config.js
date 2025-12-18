import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/all': {target: 'http://localhost:3400', changeOrigin: true,}
    },
    
  },
  plugins: [
    tailwindcss(),
    react(),
  ],
})
