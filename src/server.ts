import express from 'express'
import { env } from '@/config/env'
import { routes } from '@/routes'
import { errorHandler } from '@/middlewares/error-handler'

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api', routes)

app.use(errorHandler)

app.listen(env.port, () => {
  console.log(`🚀 Server is running on http://localhost:${env.port}`)
})
