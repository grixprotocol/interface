import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        widget: './src/widgets/index.ts',
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === 'widget' ? 'assets/js/[name].js' : 'assets/[name].js';
        },
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
});
