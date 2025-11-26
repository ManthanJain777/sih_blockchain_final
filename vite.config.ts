
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3000,
      open: true,
      host: true,
    },
  });