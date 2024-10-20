// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Remova a opção external se não for necessário
    rollupOptions: {
      // External pode ser utilizado se você tem bibliotecas externas que não quer incluir
      // Se não houver necessidade, pode ser removido
      // external: [], 
    },
  },
});
