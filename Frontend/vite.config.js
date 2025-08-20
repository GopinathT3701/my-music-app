import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 

// https://vite.dev/config/
export default defineConfig({
  
  server: {
    host: true, // allow external access
    hmr: {
      clientPort: 5173
    }
  }
,

  plugins: [react(), tailwindcss()],
})
