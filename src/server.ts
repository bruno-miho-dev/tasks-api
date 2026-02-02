import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from '@/config/env'
import { routes } from '@/routes'
import { errorHandler } from '@/middlewares/error-handler'
import { rateLimiter } from '@/middlewares/rate-limit'

const app = express()

// Segurança
app.use(helmet())
app.use(
  cors({
    origin: env.nodeEnv === 'production' ? env.corsOrigin : '*',
    credentials: true,
  })
)

// Rate limiting
app.use(rateLimiter)

// Body parser
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.nodeEnv,
  })
})

// Rotas
app.use('/api', routes)

// Error handler
app.use(errorHandler)

app.listen(env.port, () => {
  console.log(`🚀 Server is running on http://localhost:${env.port}`)
  console.log(`📝 Environment: ${env.nodeEnv}`)
})
