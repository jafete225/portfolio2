import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Define a base para os caminhos
  build: {
    outDir: 'dist', // Diretório de saída do build
  },
});
