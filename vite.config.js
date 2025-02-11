import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    loader: 'jsx', 
    include: [/\.jsx?$/], 
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for the src directory
      '@components': path.resolve(__dirname, './src/components'), // Alias for components
      '@forms': path.resolve(__dirname, './src/components/forms'), // Alias for forms
      '@tables': path.resolve(__dirname, './src/components/tables'), // Alias for tables
      '@service': path.resolve(__dirname, './src/service'), // Alias for service
      '@get': path.resolve(__dirname, './src/service/get'), // Alias for get
      '@actions': path.resolve(__dirname, './src/service/actions'), // Alias for actions
      '@accounts': path.resolve(__dirname, './src/service/accounts'), // Alias for accounts
      '@css': path.resolve(__dirname, './src/css'), // Alias for css
      '@shared-theme': path.resolve(__dirname, './src/shared-theme'), // Alias for shared-theme
    },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './setupTests.js',
  },
  base: '/lms-frontend-local/'
})
