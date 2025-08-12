import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: false,
        includeAssets: ['logo.svg', 'logoS.svg']
      })
    ],
    server: {
      proxy: {
        '/api': env.VITE_API_URL || 'http://localhost:3000',
      },
    },
  }
})
