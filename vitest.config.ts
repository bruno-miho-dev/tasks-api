import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', '**/*.spec.ts', '**/*.test.ts'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@config': resolve(__dirname, './src/config'),
      '@controllers': resolve(__dirname, './src/controllers'),
      '@middlewares': resolve(__dirname, './src/middlewares'),
      '@routes': resolve(__dirname, './src/routes'),
      '@repositories': resolve(__dirname, './src/repositories'),
      '@services': resolve(__dirname, './src/services'),
      '@utils': resolve(__dirname, './src/utils'),
      '@schemas': resolve(__dirname, './src/schemas'),
      '@types': resolve(__dirname, './src/types'),
    },
  },
})
