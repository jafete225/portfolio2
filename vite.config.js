import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Removi a configuração `input`, pois o Vite já trata isso por padrão.
      // `external` removido, a menos que seja realmente necessário.
    },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});
