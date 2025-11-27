
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

  export default defineConfig({
    plugins: [react()],
    define: {
      global: 'globalThis',
    },
    resolve: {
      alias: {
        '@': '/src',
        buffer: 'buffer',
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
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