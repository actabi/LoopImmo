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
        includeAssets: ['logo.svg', 'logoS.svg'],
        manifest: {
          name: 'LoopImmo',
          short_name: 'LoopImmo',
          start_url: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#ffffff',
          description: 'LoopImmo - La vente immobilière communautaire',
          icons: [
            {
              src: '/logoS.svg',
              sizes: '192x192',
              type: 'image/svg+xml'
            },
            {
              src: '/logoS.svg',
              sizes: '512x512',
              type: 'image/svg+xml'
            }
          ]
        }
      })
    ],
    server: {
      proxy: {
        '/api': env.VITE_API_URL || 'http://localhost:3000',
      },
    },
  }
})
