import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import sassDts from 'vite-plugin-sass-dts';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8003,
    host: "0.0.0.0"
  },
  preview: {
    host: '0.0.0.0',
    port: 8003
  },
  plugins: [
    react(),
    sassDts()
  ],
  define: {
    'process.env': {}
  },
  build: {
    sourcemap: true,
    minify: false,
    lib: {
      formats: ['es', 'umd'],
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'index',
      fileName: (format) => `index.${format}.js`
    }
  },
  base: ''
});


