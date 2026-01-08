import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Setup path aliases for clean imports (e.g., import Button from '@/components/Button')
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Standard development port for React apps
    port: 3000,
    // Automatically open the browser on server start
    open: true,
  },
  build: {
    // Ensure smaller chunks for faster loading in production
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group large dependencies like React and ReactDOM into a vendor chunk
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor_react';
            }
            // Group other node_modules into a general vendor chunk
            return 'vendor';
          }
        },
      },
    },
  },
});