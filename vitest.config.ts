/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  test: {
    // Entorno de pruebas (sin DOM, ya que las pruebas son lógica pura)
    environment: 'node',
    // Carpeta donde se buscan las pruebas
    include: ['src/pruebas/**/*.test.ts'],
    // Informe de resultados
    reporter: 'verbose',
    // Cobertura (opcional, actívala con: vitest --coverage)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'src/utils/**/*.ts',
        'src/services/notificaciones.rules.ts',
        'src/services/notification.events.ts',
        'src/types/**/*.ts',
        'src/store/auth.store.ts',
      ],
      exclude: ['node_modules', 'src/pruebas'],
    },
  },
})
