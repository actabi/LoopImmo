import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

const PORT = process.env.PORT || 3000
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend.railway.internal:3001'

app.use('/api', createProxyMiddleware({
  target: BACKEND_URL,
  changeOrigin: true,
}))

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`)
})
