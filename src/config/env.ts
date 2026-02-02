import { config } from 'dotenv'

config()

export const env = {
  port: process.env.PORT || 3333,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
  corsOrigin: process.env.CORS_ORIGIN || '*',
} as const
