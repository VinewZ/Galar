import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@wailsjs": path.resolve(__dirname, "wailsjs"),
      "@components": path.resolve(__dirname, "src/components"),
    }
  },
  plugins: [react()]
})
